import mongoose from 'mongoose';

const forecastSchema = new mongoose.Schema({
  alert_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Alert', required: true },
  daily_cases: [{ type: Number, required: true }],
  r0: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Forecast', forecastSchema);
