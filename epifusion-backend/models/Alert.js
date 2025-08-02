import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  disease: { type: String, required: true },
  location: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  risk_score: { type: Number, required: true },
  credibility: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
  source: { type: String, required: true },
  explanation: { type: String },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Alert', alertSchema);
