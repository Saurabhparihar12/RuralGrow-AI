import mongoose from 'mongoose';

const captionSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  shopType: { type: String, required: true },
  captionText: { type: String, required: true },
  reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review', default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Caption || mongoose.model('Caption', captionSchema);
