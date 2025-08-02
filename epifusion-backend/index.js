import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import alertRoutes from './routes/alerts.js';
import analyzeRoutes from './routes/analyze.js';

dotenv.config();

const app = express();

// Configure CORS to allow requests from the dashboard
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'EpiFusion Backend is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/alerts', alertRoutes);
app.use('/api/analyze', analyzeRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
