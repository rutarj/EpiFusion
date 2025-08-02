import express from 'express';
import { alerts } from '../services/alertStore.js';

const router = express.Router();

// GET all alerts
router.get('/', (req, res) => {
  res.json({ alerts });
});

// POST feedback (approve/flag)
router.post('/feedback', (req, res) => {
  const { alert_id, feedback_type } = req.body;
  console.log(`Feedback received for ${alert_id}: ${feedback_type}`);
  res.json({ success: true });
});

// POST send alert
router.post('/send-alert', (req, res) => {
  const { alert_id } = req.body;
  console.log(`Sending alert to responders: ${alert_id}`);
  res.json({ success: true });
});

export default router;
