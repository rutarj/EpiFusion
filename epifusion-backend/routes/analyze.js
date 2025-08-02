// routes/analyze.js
import express from 'express';
import { analyzeTextWithGemini } from '../services/geminiService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { text } = req.body;
  try {
    const alert = await analyzeTextWithGemini(text);
    res.json({ alert });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI analysis failed' });
  }
});

export default router;
