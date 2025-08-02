import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRoute from './routes/upload.js';
import chatRoute   from './routes/chat.js';
import alertRoutes from './routes/alerts.js';
import analyzeRoutes from './routes/analyze.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', uploadRoute);
app.use('/api', chatRoute);

app.use('/api/alerts', alertRoutes);
app.use('/api/analyze', analyzeRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
