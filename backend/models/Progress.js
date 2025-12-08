import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    videoId: {
        type: String,
        required: [true, 'Video ID is required'],
        trim: true
    },
    watchedSeconds: {
        type: Number,
        default: 0,
        min: 0
    },
    totalDuration: {
        type: Number,
        required: true,
        min: 0
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    lastWatchedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date,
        default: null
    }
});

// Compound index for efficient queries
progressSchema.index({ userId: 1, videoId: 1 }, { unique: true });

// Calculate completion percentage
progressSchema.virtual('completionPercentage').get(function () {
    if (this.totalDuration === 0) return 0;
    return Math.min(100, Math.round((this.watchedSeconds / this.totalDuration) * 100));
});

// Auto-mark as completed if watched >= 95%
progressSchema.pre('save', function (next) {
    if (this.totalDuration > 0) {
        const percentage = (this.watchedSeconds / this.totalDuration) * 100;
        if (percentage >= 95 && !this.isCompleted) {
            this.isCompleted = true;
            this.completedAt = new Date();
        }
    }
    next();
});

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
