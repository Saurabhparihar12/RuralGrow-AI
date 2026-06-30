import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  shopName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  replySuggestion: { type: String, default: '' },
  sentiment: { type: String, enum: ['positive', 'negative', 'neutral'], default: 'neutral' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
