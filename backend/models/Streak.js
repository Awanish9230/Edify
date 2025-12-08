import mongoose from 'mongoose';

const streakSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    date: {
        type: Date,
        required: true,
        index: true
    },
    totalWatchTimeSeconds: {
        type: Number,
        default: 0,
        min: 0
    },
    streakCount: {
        type: Number,
        default: 0,
        min: 0
    },
    lastActiveDate: {
        type: Date,
        default: Date.now
    }
});

// Compound index for efficient queries
streakSchema.index({ userId: 1, date: 1 }, { unique: true });

// Check if user met daily goal (10 minutes = 600 seconds)
streakSchema.virtual('metDailyGoal').get(function () {
    return this.totalWatchTimeSeconds >= 600;
});

const Streak = mongoose.model('Streak', streakSchema);

export default Streak;
