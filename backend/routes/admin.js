import express from 'express';
import { protect } from '../middleware/auth.js';
import { adminAuth } from '../middleware/admin.js';
import {
    getAllUsers,
    getPlatformStats,
    deleteUser,
    updateUserRole,
    getAllVideos,
    deleteVideo
} from '../controllers/adminController.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(adminAuth);

// User management routes
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id/role', updateUserRole);

// Statistics route
router.get('/stats', getPlatformStats);

// Video management routes
router.get('/videos', getAllVideos);
router.delete('/videos/:id', deleteVideo);

export default router;
