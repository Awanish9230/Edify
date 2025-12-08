import express from 'express';
import {
    addVideo,
    addPlaylist,
    getVideos,
    getPlaylists,
    deleteVideo,
    reorderVideos
} from '../controllers/videoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/add', addVideo);
router.post('/playlist/add', addPlaylist);
router.get('/list', getVideos);
router.get('/playlists', getPlaylists);
router.delete('/:id', deleteVideo);
router.put('/reorder', reorderVideos);

export default router;
