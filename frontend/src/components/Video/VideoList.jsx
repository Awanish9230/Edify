import { useState } from 'react';
import { videoService } from '../../services/video.service';

const VideoList = ({ videos, onVideoClick, onVideoDeleted }) => {
    const [deletingId, setDeletingId] = useState(null);

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
        return `${minutes}:${String(secs).padStart(2, '0')}`;
    };

    const handleDelete = async (e, videoId) => {
        e.stopPropagation();

        if (window.confirm('Are you sure you want to delete this video?')) {
            setDeletingId(videoId);
            try {
                await videoService.deleteVideo(videoId);
                if (onVideoDeleted) {
                    onVideoDeleted();
                }
            } catch (error) {
                console.error('Error deleting video:', error);
                alert('Failed to delete video. Please try again.');
            } finally {
                setDeletingId(null);
            }
        }
    };

    if (!videos || videos.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">📺</div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">No videos yet</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">Add your first video to get started!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => {
                const progress = video.progress || {};
                const completionPercentage = progress.completionPercentage || 0;

                return (
                    <div
                        key={video._id}
                        className="card cursor-pointer hover:scale-105 transform transition-all duration-300 p-0 overflow-hidden relative group"
                    >
                        <button
                            onClick={(e) => handleDelete(e, video._id)}
                            disabled={deletingId === video._id}
                            className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-50"
                            title="Delete video"
                        >
                            {deletingId === video._id ? '⏳' : '🗑️'}
                        </button>

                        <div className="relative" onClick={() => onVideoClick(video)}>
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                {formatDuration(video.duration)}
                            </div>
                            {progress.isCompleted && (
                                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                                    ✓ Completed
                                </div>
                            )}
                        </div>

                        <div className="p-4" onClick={() => onVideoClick(video)}>
                            <h3 className="font-semibold text-sm line-clamp-2 mb-2">{video.title}</h3>

                            {completionPercentage > 0 && !progress.isCompleted && (
                                <div className="mt-2">
                                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                                        <span>{completionPercentage}% watched</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${completionPercentage}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default VideoList;
