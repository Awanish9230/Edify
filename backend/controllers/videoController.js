import Video from '../models/Video.js';
import { parseVideoId, parsePlaylistId, fetchVideoDetails, fetchPlaylistDetails } from '../utils/youtube.js';

// @desc    Add single video
// @route   POST /api/video/add
// @access  Private
export const addVideo = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: 'Video URL is required'
            });
        }

        // Parse video ID from URL
        const videoId = parseVideoId(url);
        if (!videoId) {
            return res.status(400).json({
                success: false,
                message: 'Invalid YouTube video URL'
            });
        }

        // Check if video already exists for this user
        const existingVideo = await Video.findOne({
            userId: req.user.id,
            videoId: videoId
        });

        if (existingVideo) {
            return res.status(400).json({
                success: false,
                message: 'Video already added to your library'
            });
        }

        // Fetch video details from YouTube
        const videoDetails = await fetchVideoDetails(videoId);

        // Create video
        const video = await Video.create({
            userId: req.user.id,
            ...videoDetails
        });

        res.status(201).json({
            success: true,
            data: video
        });
    } catch (error) {
        console.error('Add video error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error while adding video'
        });
    }
};

// @desc    Add playlist
// @route   POST /api/video/playlist/add
// @access  Private
export const addPlaylist = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: 'Playlist URL is required'
            });
        }

        // Parse playlist ID from URL
        const playlistId = parsePlaylistId(url);
        if (!playlistId) {
            return res.status(400).json({
                success: false,
                message: 'Invalid YouTube playlist URL'
            });
        }

        // Fetch playlist details from YouTube
        const playlistData = await fetchPlaylistDetails(playlistId);

        // Create videos
        const videosToCreate = playlistData.videos.map(video => ({
            userId: req.user.id,
            videoId: video.videoId,
            title: video.title,
            thumbnail: video.thumbnail,
            duration: video.duration,
            playlistId: playlistData.playlistId,
            playlistName: playlistData.playlistName,
            orderIndex: video.orderIndex
        }));

        // Bulk insert (skip duplicates)
        const videos = await Video.insertMany(videosToCreate, { ordered: false })
            .catch(error => {
                // Handle duplicate key errors
                if (error.code === 11000) {
                    return error.insertedDocs || [];
                }
                throw error;
            });

        res.status(201).json({
            success: true,
            data: {
                playlistId: playlistData.playlistId,
                playlistName: playlistData.playlistName,
                videosAdded: videos.length || videosToCreate.length,
                videos: videos
            }
        });
    } catch (error) {
        console.error('Add playlist error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error while adding playlist'
        });
    }
};

// @desc    Get user's videos
// @route   GET /api/video/list
// @access  Private
export const getVideos = async (req, res) => {
    try {
        const { playlistId } = req.query;

        const query = { userId: req.user.id };
        if (playlistId) {
            query.playlistId = playlistId;
        }

        const videos = await Video.find(query).sort({ orderIndex: 1, addedAt: -1 });

        res.status(200).json({
            success: true,
            count: videos.length,
            data: videos
        });
    } catch (error) {
        console.error('Get videos error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching videos'
        });
    }
};

// @desc    Get user's playlists
// @route   GET /api/video/playlists
// @access  Private
export const getPlaylists = async (req, res) => {
    try {
        const playlists = await Video.aggregate([
            { $match: { userId: req.user._id, playlistId: { $ne: null } } },
            {
                $group: {
                    _id: '$playlistId',
                    playlistName: { $first: '$playlistName' },
                    videoCount: { $sum: 1 },
                    thumbnail: { $first: '$thumbnail' },
                    addedAt: { $min: '$addedAt' }
                }
            },
            { $sort: { addedAt: -1 } }
        ]);

        res.status(200).json({
            success: true,
            count: playlists.length,
            data: playlists
        });
    } catch (error) {
        console.error('Get playlists error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching playlists'
        });
    }
};

// @desc    Delete video
// @route   DELETE /api/video/:id
// @access  Private
export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'Video not found'
            });
        }

        await video.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Video deleted successfully'
        });
    } catch (error) {
        console.error('Delete video error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting video'
        });
    }
};

// @desc    Reorder videos in playlist
// @route   PUT /api/video/reorder
// @access  Private
export const reorderVideos = async (req, res) => {
    try {
        const { videoIds } = req.body; // Array of video IDs in new order

        if (!Array.isArray(videoIds)) {
            return res.status(400).json({
                success: false,
                message: 'videoIds must be an array'
            });
        }

        // Update order index for each video
        const updatePromises = videoIds.map((videoId, index) =>
            Video.updateOne(
                { _id: videoId, userId: req.user.id },
                { orderIndex: index }
            )
        );

        await Promise.all(updatePromises);

        res.status(200).json({
            success: true,
            message: 'Videos reordered successfully'
        });
    } catch (error) {
        console.error('Reorder videos error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while reordering videos'
        });
    }
};
