import express from 'express';
import { classifyAlert } from '../services/classifyService.js';

const router = express.Router();

// POST /api/classify
router.post('/', (req, res) => {
  const alert = req.body;

  classifyAlert(alert, (err, result) => {
    if (err) {
      console.error('❌ Classification failed:', err);
      return res.status(500).json({ error: 'Classification error' });
    }

    res.json(result);
  });
});

export default router;
