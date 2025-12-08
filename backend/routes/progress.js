import express from 'express';
import {
    updateProgress,
    getResumeTime,
    getProgressStats,
    getVideosWithProgress
} from '../controllers/progressController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.put('/:videoId', updateProgress);
router.get('/:videoId/resume', getResumeTime);
router.get('/stats', getProgressStats);
router.get('/videos', getVideosWithProgress);

export default router;
