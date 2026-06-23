import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonDbPath = path.join(__dirname, 'database.json');

// Flag indicating if MongoDB is running and connected
let isMongoConnected = false;

export function setMongoConnected(status) {
  isMongoConnected = status;
}

// Mongoose Review schema
const reviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  shopName: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true },
  replySuggestion: { type: String, default: '' },
  sentiment: { type: String, default: 'neutral' },
  createdAt: { type: Date, default: Date.now }
});

const ReviewModel = mongoose.models.Review || mongoose.model('Review', reviewSchema);

// JSON File Database utilities
async function readJsonDb() {
  try {
    const data = await fs.readFile(jsonDbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('[dbHelper] Error reading JSON database, using empty list:', error.message);
    return [];
  }
}

async function writeJsonDb(data) {
  try {
    await fs.writeFile(jsonDbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('[dbHelper] Error writing to JSON database:', error.message);
  }
}

// Unified Review service adapter
export const reviewService = {
  async listReviews(search, sentiment) {
    if (isMongoConnected) {
      const query = {};
      if (sentiment) query.sentiment = sentiment;
      if (search) {
        query.$or = [
          { author: { $regex: search, $options: 'i' } },
          { reviewText: { $regex: search, $options: 'i' } },
          { shopName: { $regex: search, $options: 'i' } }
        ];
      }
      return await ReviewModel.find(query).sort({ createdAt: -1 });
    } else {
      let list = await readJsonDb();
      if (sentiment) {
        list = list.filter(r => r.sentiment.toLowerCase() === sentiment.toLowerCase());
      }
      if (search) {
        const lowerSearch = search.toLowerCase();
        list = list.filter(r => 
          (r.author && r.author.toLowerCase().includes(lowerSearch)) ||
          (r.reviewText && r.reviewText.toLowerCase().includes(lowerSearch)) ||
          (r.shopName && r.shopName.toLowerCase().includes(lowerSearch))
        );
      }
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  },

  async getReviewById(id) {
    if (isMongoConnected) {
      return await ReviewModel.findById(id);
    } else {
      const list = await readJsonDb();
      return list.find(r => r.id === id) || null;
    }
  },

  async createReview(data) {
    if (isMongoConnected) {
      const newReview = new ReviewModel(data);
      return await newReview.save();
    } else {
      const list = await readJsonDb();
      const newReview = {
        id: `rev-${Date.now()}`,
        author: data.author,
        shopName: data.shopName,
        rating: data.rating,
        reviewText: data.reviewText,
        replySuggestion: data.replySuggestion || '',
        sentiment: data.sentiment || 'neutral',
        createdAt: new Date().toISOString()
      };
      list.push(newReview);
      await writeJsonDb(list);
      return newReview;
    }
  },

  async updateReview(id, data) {
    if (isMongoConnected) {
      return await ReviewModel.findByIdAndUpdate(id, data, { new: true });
    } else {
      const list = await readJsonDb();
      const idx = list.findIndex(r => r.id === id);
      if (idx === -1) return null;

      const updatedReview = {
        ...list[idx],
        ...data,
        id // Lock ID matching
      };
      list[idx] = updatedReview;
      await writeJsonDb(list);
      return updatedReview;
    }
  },

  async deleteReview(id) {
    if (isMongoConnected) {
      return await ReviewModel.findByIdAndDelete(id);
    } else {
      const list = await readJsonDb();
      const idx = list.findIndex(r => r.id === id);
      if (idx === -1) return null;

      const removed = list.splice(idx, 1)[0];
      await writeJsonDb(list);
      return removed;
    }
  }
};
