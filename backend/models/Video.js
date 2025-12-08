import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
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
    title: {
        type: String,
        required: [true, 'Video title is required'],
        trim: true
    },
    thumbnail: {
        type: String,
        required: [true, 'Thumbnail URL is required']
    },
    duration: {
        type: Number, // Duration in seconds
        required: [true, 'Duration is required']
    },
    playlistId: {
        type: String,
        default: null,
        trim: true
    },
    playlistName: {
        type: String,
        default: null,
        trim: true
    },
    orderIndex: {
        type: Number,
        default: 0
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

// Compound index for efficient queries
videoSchema.index({ userId: 1, playlistId: 1, orderIndex: 1 });
videoSchema.index({ userId: 1, videoId: 1 });

const Video = mongoose.model('Video', videoSchema);

export default Video;
