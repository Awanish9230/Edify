import Streak from '../models/Streak.js';
import Progress from '../models/Progress.js';

// @desc    Update daily watch time and streak
// @route   POST /api/streak/update
// @access  Private
export const updateStreak = async (req, res) => {
    try {
        const { watchTimeSeconds } = req.body;

        if (!watchTimeSeconds || watchTimeSeconds <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid watch time is required'
            });
        }

        // Get today's date (start of day)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Find or create today's streak record
        let streak = await Streak.findOne({
            userId: req.user.id,
            date: today
        });

        if (streak) {
            // Update existing streak
            streak.totalWatchTimeSeconds += watchTimeSeconds;
            streak.lastActiveDate = new Date();
        } else {
            // Get yesterday's streak to calculate new streak count
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            const yesterdayStreak = await Streak.findOne({
                userId: req.user.id,
                date: yesterday
            });

            let newStreakCount = 1;

            // If yesterday had a streak and met the daily goal, continue the streak
            if (yesterdayStreak && yesterdayStreak.metDailyGoal) {
                newStreakCount = yesterdayStreak.streakCount + 1;
            }

            // Create new streak record
            streak = await Streak.create({
                userId: req.user.id,
                date: today,
                totalWatchTimeSeconds: watchTimeSeconds,
                streakCount: newStreakCount,
                lastActiveDate: new Date()
            });
        }

        // Check if daily goal is met and update streak count
        if (streak.metDailyGoal && streak.streakCount === 0) {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            const yesterdayStreak = await Streak.findOne({
                userId: req.user.id,
                date: yesterday
            });

            streak.streakCount = yesterdayStreak && yesterdayStreak.metDailyGoal
                ? yesterdayStreak.streakCount + 1
                : 1;
        }

        await streak.save();

        res.status(200).json({
            success: true,
            data: streak
        });
    } catch (error) {
        console.error('Update streak error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while updating streak'
        });
    }
};

// @desc    Get streak statistics
// @route   GET /api/streak/stats
// @access  Private
export const getStreakStats = async (req, res) => {
    try {
        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get today's streak
        const todayStreak = await Streak.findOne({
            userId: req.user.id,
            date: today
        });

        // Get current streak count
        let currentStreak = 0;
        if (todayStreak && todayStreak.metDailyGoal) {
            currentStreak = todayStreak.streakCount;
        } else {
            // Check yesterday
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStreak = await Streak.findOne({
                userId: req.user.id,
                date: yesterday
            });
            if (yesterdayStreak && yesterdayStreak.metDailyGoal) {
                currentStreak = yesterdayStreak.streakCount;
            }
        }

        // Get best streak
        const allStreaks = await Streak.find({ userId: req.user.id }).sort({ streakCount: -1 }).limit(1);
        const bestStreak = allStreaks.length > 0 ? allStreaks[0].streakCount : 0;

        // Get today's watch time
        const todayWatchTime = todayStreak ? todayStreak.totalWatchTimeSeconds : 0;

        // Get this week's watch time
        const weekStart = new Date(today);
        weekStart.setDate(weekStart.getDate() - 6); // Last 7 days

        const weekStreaks = await Streak.find({
            userId: req.user.id,
            date: { $gte: weekStart, $lte: today }
        });

        const weekWatchTime = weekStreaks.reduce((sum, s) => sum + s.totalWatchTimeSeconds, 0);

        res.status(200).json({
            success: true,
            data: {
                currentStreak,
                bestStreak,
                todayWatchTimeSeconds: todayWatchTime,
                weekWatchTimeSeconds: weekWatchTime,
                metDailyGoal: todayStreak ? todayStreak.metDailyGoal : false
            }
        });
    } catch (error) {
        console.error('Get streak stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching streak stats'
        });
    }
};

// @desc    Get weekly watch time data
// @route   GET /api/streak/weekly
// @access  Private
export const getWeeklyData = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const weekStart = new Date(today);
        weekStart.setDate(weekStart.getDate() - 6); // Last 7 days

        const weekStreaks = await Streak.find({
            userId: req.user.id,
            date: { $gte: weekStart, $lte: today }
        }).sort({ date: 1 });

        // Create array for all 7 days
        const weekData = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(date.getDate() + i);

            const dayStreak = weekStreaks.find(s =>
                s.date.toDateString() === date.toDateString()
            );

            weekData.push({
                date: date.toISOString(),
                dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
                watchTimeSeconds: dayStreak ? dayStreak.totalWatchTimeSeconds : 0,
                metDailyGoal: dayStreak ? dayStreak.metDailyGoal : false
            });
        }

        res.status(200).json({
            success: true,
            data: weekData
        });
    } catch (error) {
        console.error('Get weekly data error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching weekly data'
        });
    }
};
