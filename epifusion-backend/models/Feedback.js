import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  alert_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Alert', required: true },
  feedback_type: { type: String, enum: ['approve', 'flag'], required: true },
  submitted_at: { type: Date, default: Date.now }
});

export default mongoose.model('Feedback', feedbackSchema);
