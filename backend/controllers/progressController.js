import Progress from '../models/Progress.js';
import Video from '../models/Video.js';

// @desc    Update video progress
// @route   PUT /api/progress/:videoId
// @access  Private
export const updateProgress = async (req, res) => {
    try {
        const { videoId } = req.params;
        const { watchedSeconds, totalDuration } = req.body;

        if (watchedSeconds === undefined || totalDuration === undefined) {
            return res.status(400).json({
                success: false,
                message: 'watchedSeconds and totalDuration are required'
            });
        }

        // Find or create progress
        let progress = await Progress.findOne({
            userId: req.user.id,
            videoId: videoId
        });

        if (progress) {
            progress.watchedSeconds = watchedSeconds;
            progress.totalDuration = totalDuration;
            progress.lastWatchedAt = new Date();
            await progress.save();
        } else {
            progress = await Progress.create({
                userId: req.user.id,
                videoId: videoId,
                watchedSeconds,
                totalDuration
            });
        }

        res.status(200).json({
            success: true,
            data: progress
        });
    } catch (error) {
        console.error('Update progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating progress'
        });
    }
};

// @desc    Get video resume time
// @route   GET /api/progress/:videoId/resume
// @access  Private
export const getResumeTime = async (req, res) => {
    try {
        const { videoId } = req.params;

        const progress = await Progress.findOne({
            userId: req.user.id,
            videoId: videoId
        });

        if (!progress) {
            return res.status(200).json({
                success: true,
                data: {
                    watchedSeconds: 0,
                    isCompleted: false
                }
            });
        }

        res.status(200).json({
            success: true,
            data: {
                watchedSeconds: progress.watchedSeconds,
                isCompleted: progress.isCompleted,
                completionPercentage: progress.completionPercentage
            }
        });
    } catch (error) {
        console.error('Get resume time error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching resume time'
        });
    }
};

// @desc    Get user progress stats
// @route   GET /api/progress/stats
// @access  Private
export const getProgressStats = async (req, res) => {
    try {
        // Get all user's videos
        const totalVideos = await Video.countDocuments({ userId: req.user.id });

        // Get completed videos
        const completedVideos = await Progress.countDocuments({
            userId: req.user.id,
            isCompleted: true
        });

        // Get total watch time
        const progressData = await Progress.find({ userId: req.user.id });
        const totalWatchTime = progressData.reduce((sum, p) => sum + p.watchedSeconds, 0);

        // Get in-progress videos
        const inProgressVideos = await Progress.countDocuments({
            userId: req.user.id,
            isCompleted: false,
            watchedSeconds: { $gt: 0 }
        });

        res.status(200).json({
            success: true,
            data: {
                totalVideos,
                completedVideos,
                inProgressVideos,
                totalWatchTimeSeconds: totalWatchTime,
                totalWatchTimeFormatted: formatTime(totalWatchTime)
            }
        });
    } catch (error) {
        console.error('Get progress stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching progress stats'
        });
    }
};

// @desc    Get videos with progress
// @route   GET /api/progress/videos
// @access  Private
export const getVideosWithProgress = async (req, res) => {
    try {
        const videos = await Video.find({ userId: req.user.id }).sort({ addedAt: -1 });
        const videoIds = videos.map(v => v.videoId);

        const progressData = await Progress.find({
            userId: req.user.id,
            videoId: { $in: videoIds }
        });

        // Create a map of progress by videoId
        const progressMap = {};
        progressData.forEach(p => {
            progressMap[p.videoId] = {
                watchedSeconds: p.watchedSeconds,
                isCompleted: p.isCompleted,
                completionPercentage: p.completionPercentage,
                lastWatchedAt: p.lastWatchedAt
            };
        });

        // Combine videos with progress
        const videosWithProgress = videos.map(video => ({
            ...video.toObject(),
            progress: progressMap[video.videoId] || {
                watchedSeconds: 0,
                isCompleted: false,
                completionPercentage: 0,
                lastWatchedAt: null
            }
        }));

        res.status(200).json({
            success: true,
            count: videosWithProgress.length,
            data: videosWithProgress
        });
    } catch (error) {
        console.error('Get videos with progress error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching videos with progress'
        });
    }
};

// Helper function to format time
const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
};
