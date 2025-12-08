import express from 'express';
import {
    updateStreak,
    getStreakStats,
    getWeeklyData
} from '../controllers/streakController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/update', updateStreak);
router.get('/stats', getStreakStats);
router.get('/weekly', getWeeklyData);

export default router;
