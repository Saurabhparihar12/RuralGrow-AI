import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import ReviewModel from '../models/Review.js';
import ShopModel from '../models/Shop.js';
import CaptionModel from '../models/Caption.js';
import UserModel from '../models/User.js';
import bcryptjs from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonDbPath = path.join(__dirname, 'database.json');

// Flag indicating if MongoDB is running and connected
let isMongoConnected = false;

export function setMongoConnected(status) {
  isMongoConnected = status;
}

// JSON File Database utilities
async function readJsonDb() {
  try {
    const data = await fs.readFile(jsonDbPath, 'utf8');
    const parsed = JSON.parse(data);
    // Support legacy arrays or structured objects
    if (Array.isArray(parsed)) {
      return { reviews: parsed, shops: [], captions: [], users: [] };
    }
    return {
      reviews: parsed.reviews || [],
      shops: parsed.shops || [],
      captions: parsed.captions || [],
      users: parsed.users || []
    };
  } catch (error) {
    console.error('[dbHelper] Error reading JSON database, using empty structure:', error.message);
    return { reviews: [], shops: [], captions: [], users: [] };
  }
}

async function writeJsonDb(data) {
  try {
    await fs.writeFile(jsonDbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('[dbHelper] Error writing to JSON database:', error.message);
  }
}

// Unified Review and Caption service adapter
export const reviewService = {
  // Review Methods
  async listReviews(search, sentiment) {
    if (isMongoConnected) {
      const query = {};
      if (sentiment && sentiment !== 'all') query.sentiment = sentiment;
      if (search) {
        query.$or = [
          { author: { $regex: search, $options: 'i' } },
          { reviewText: { $regex: search, $options: 'i' } },
          { shopName: { $regex: search, $options: 'i' } }
        ];
      }
      return await ReviewModel.find(query).sort({ createdAt: -1 });
    } else {
      const db = await readJsonDb();
      let list = db.reviews;
      if (sentiment && sentiment !== 'all') {
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
      const db = await readJsonDb();
      return db.reviews.find(r => r.id === id || r._id === id) || null;
    }
  },

  async createReview(data) {
    if (isMongoConnected) {
      const newReview = new ReviewModel(data);
      return await newReview.save();
    } else {
      const db = await readJsonDb();
      const newId = `rev-${Date.now()}`;
      const newReview = {
        id: newId,
        _id: newId,
        author: data.author,
        shopName: data.shopName,
        rating: data.rating,
        reviewText: data.reviewText,
        replySuggestion: data.replySuggestion || '',
        sentiment: data.sentiment || 'neutral',
        createdAt: new Date().toISOString()
      };
      db.reviews.push(newReview);
      await writeJsonDb(db);
      return newReview;
    }
  },

  async updateReview(id, data) {
    if (isMongoConnected) {
      return await ReviewModel.findByIdAndUpdate(id, data, { new: true });
    } else {
      const db = await readJsonDb();
      const idx = db.reviews.findIndex(r => r.id === id || r._id === id);
      if (idx === -1) return null;

      const updatedReview = {
        ...db.reviews[idx],
        ...data,
        id, // Lock ID matching
        _id: id
      };
      db.reviews[idx] = updatedReview;
      await writeJsonDb(db);
      return updatedReview;
    }
  },

  async deleteReview(id) {
    if (isMongoConnected) {
      return await ReviewModel.findByIdAndDelete(id);
    } else {
      const db = await readJsonDb();
      const idx = db.reviews.findIndex(r => r.id === id || r._id === id);
      if (idx === -1) return null;

      const removed = db.reviews.splice(idx, 1)[0];
      await writeJsonDb(db);
      return removed;
    }
  },

  // Caption Methods
  async listCaptions() {
    if (isMongoConnected) {
      return await CaptionModel.find({}).sort({ createdAt: -1 });
    } else {
      const db = await readJsonDb();
      return db.captions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  },

  async createCaption(data) {
    if (isMongoConnected) {
      const newCaption = new CaptionModel(data);
      return await newCaption.save();
    } else {
      const db = await readJsonDb();
      const newId = `cap-${Date.now()}`;
      const newCaption = {
        id: newId,
        _id: newId,
        productName: data.productName,
        shopType: data.shopType,
        captionText: data.captionText,
        reviewId: data.reviewId || null,
        createdAt: new Date().toISOString()
      };
      db.captions.push(newCaption);
      await writeJsonDb(db);
      return newCaption;
    }
  },

  async deleteCaption(id) {
    if (isMongoConnected) {
      return await CaptionModel.findByIdAndDelete(id);
    } else {
      const db = await readJsonDb();
      const idx = db.captions.findIndex(c => c.id === id || c._id === id);
      if (idx === -1) return null;

      const removed = db.captions.splice(idx, 1)[0];
      await writeJsonDb(db);
      return removed;
    }
  }
};

// Unified User service adapter
export const userService = {
  async findUserByEmail(email) {
    if (isMongoConnected) {
      return await UserModel.findOne({ email: email.toLowerCase() });
    } else {
      const db = await readJsonDb();
      return db.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
    }
  },

  async findUserById(id) {
    if (isMongoConnected) {
      return await UserModel.findById(id);
    } else {
      const db = await readJsonDb();
      return db.users.find(u => u.id === id || u._id === id) || null;
    }
  },

  async createUser(data) {
    if (isMongoConnected) {
      const newUser = new UserModel(data);
      return await newUser.save();
    } else {
      const db = await readJsonDb();
      if (!db.users) db.users = [];
      
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(data.password, salt);
      
      const newId = `usr-${Date.now()}`;
      const newUser = {
        id: newId,
        _id: newId,
        name: data.name,
        email: data.email.toLowerCase(),
        password: hashedPassword,
        role: data.role || 'merchant',
        shopName: data.shopName || 'Garhwal Organic Farms',
        createdAt: new Date().toISOString()
      };
      
      db.users.push(newUser);
      await writeJsonDb(db);
      return newUser;
    }
  },

  async comparePassword(enteredPassword, hashedPassword) {
    return await bcryptjs.compare(enteredPassword, hashedPassword);
  }
};
