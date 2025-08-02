import express from 'express';
import Alert from '../models/Alert.js';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// GET only active alerts
router.get('/', async (req, res) => {
    try {
      const alerts = await Alert.find({
        risk_score: { $gte: 0.7 },
        credibility: { $ne: 'Low' } // optional filter
      }).sort({ createdAt: -1 });
  
      res.json({ alerts });
    } catch (err) {
      console.error('❌ Failed to fetch alerts:', err);
      res.status(500).json({ error: 'Failed to retrieve alerts' });
    }
  });
  
router.post('/feedback', async (req, res) => {
  try {
    const { alert_id, feedback_type } = req.body;
    const feedback = new Feedback({ alert_id, feedback_type });
    await feedback.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

router.post('/send-alert', (req, res) => {
  const { alert_id } = req.body;
  console.log(`Sending alert to responders: ${alert_id}`);
  res.json({ success: true });
});

export default router;
