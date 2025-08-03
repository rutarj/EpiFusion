import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
<<<<<<< HEAD
import uploadRoute from './routes/upload.js';
import chatRoute   from './routes/chat.js';
import alertRoutes from './routes/alerts.js';
import analyzeRoutes from './routes/analyze.js';
import 'dotenv/config';
=======
import mongoose from 'mongoose';

import alertRoutes from './routes/alerts.js';
import analyzeRoutes from './routes/analyze.js';
import classifyRoutes from './routes/classify.js';
import Alert from './models/Alert.js'; // Import the model
>>>>>>> origin/feature/backend

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('🟢 MongoDB connected');
}).catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', uploadRoute);
app.use('/api', chatRoute);

app.use('/api/alerts', alertRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/classify', classifyRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
