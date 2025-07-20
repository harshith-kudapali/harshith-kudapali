import express from 'express';
import Visitor from '../models/Visitor.js';

const router = express.Router();

router.get('/visitors', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const filter = {};
    if (startDate && endDate) {
      filter.visitDate = {
        $gte: new Date(startDate),
        $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)) // Include full end day
      };
    }

    const visitors = await Visitor.find(filter)
      .sort({ visitDate: -1 })
      .limit(200); // Limit results for performance
      
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve visitor data' });
  }
});

export default router;
