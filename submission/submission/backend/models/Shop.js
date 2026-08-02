import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ownerName: { type: String, required: true },
  businessType: { type: String, enum: ['Farm', 'Handloom', 'Homestay'], required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Shop || mongoose.model('Shop', shopSchema);
