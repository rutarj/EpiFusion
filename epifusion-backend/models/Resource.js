import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  alert_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Alert', required: true },
  beds_needed: Number,
  beds_capacity: Number,
  staff_needed: Number,
  staff_capacity: Number,
  vaccine_stock: Number,
  vaccine_threshold: Number,
}, { timestamps: true });

export default mongoose.model('Resource', resourceSchema);
