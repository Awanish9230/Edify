import User from '../models/User.js';
import Video from '../models/Video.js';
import Progress from '../models/Progress.js';
import Streak from '../models/Streak.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                users,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get platform statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getPlatformStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalVideos = await Video.countDocuments();
        const totalProgress = await Progress.countDocuments();

        // Get users registered today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const usersToday = await User.countDocuments({
            createdAt: { $gte: today }
        });

        // Get total watch time
        const progressData = await Progress.aggregate([
            {
                $group: {
                    _id: null,
                    totalWatchTime: { $sum: '$lastWatchedSecond' }
                }
            }
        ]);

        const totalWatchTime = progressData.length > 0 ? progressData[0].totalWatchTime : 0;

        // Get completed videos count
        const completedVideos = await Progress.countDocuments({ isCompleted: true });

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalVideos,
                totalProgress,
                usersToday,
                totalWatchTime,
                completedVideos
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Prevent deleting yourself
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete your own account'
            });
        }

        // Delete user's videos, progress, and streaks
        await Video.deleteMany({ user: user._id });
        await Progress.deleteMany({ user: user._id });
        await Streak.deleteMany({ user: user._id });
        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: 'User and associated data deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update user role
// @route   PATCH /api/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role. Must be "user" or "admin"'
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Prevent changing your own role
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'Cannot change your own role'
            });
        }

        user.role = role;
        await user.save();

        res.status(200).json({
            success: true,
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all videos across platform
// @route   GET /api/admin/videos
// @access  Private/Admin
export const getAllVideos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const videos = await Video.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Video.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                videos,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete any video
// @route   DELETE /api/admin/videos/:id
// @access  Private/Admin
export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'Video not found'
            });
        }

        // Delete associated progress
        await Progress.deleteMany({ video: video._id });
        await video.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Video deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
