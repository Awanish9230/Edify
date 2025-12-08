import { useState, useEffect } from 'react';
import { adminService } from '../../services/admin.service';

const VideoManagement = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchVideos();
    }, [page]);

    const fetchVideos = async () => {
        try {
            const response = await adminService.getAllVideos(page, 20);
            setVideos(response.data.videos);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteVideo = async (videoId, videoTitle) => {
        if (window.confirm(`Are you sure you want to delete "${videoTitle}"?`)) {
            setDeletingId(videoId);
            try {
                await adminService.deleteVideo(videoId);
                fetchVideos();
            } catch (error) {
                console.error('Error deleting video:', error);
                alert('Failed to delete video');
            } finally {
                setDeletingId(null);
            }
        }
    };

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hours > 0) {
            return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
        return `${minutes}:${String(secs).padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-dark-bg p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 dark:bg-dark-card rounded w-1/4 mb-6"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-64 bg-gray-200 dark:bg-dark-card rounded-xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">📺 Video Management</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Total: {pagination?.total || 0} videos
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {videos.map((video) => (
                        <div
                            key={video._id}
                            className="card p-0 overflow-hidden relative group"
                        >
                            <button
                                onClick={() => handleDeleteVideo(video._id, video.title)}
                                disabled={deletingId === video._id}
                                className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-50"
                                title="Delete video"
                            >
                                {deletingId === video._id ? '⏳' : '🗑️'}
                            </button>

                            <div className="relative">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                                    {formatDuration(video.duration)}
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-sm line-clamp-2 mb-2">{video.title}</h3>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                    <p>👤 {video.user?.name || 'Unknown'}</p>
                                    <p>📧 {video.user?.email || 'N/A'}</p>
                                    {video.playlistName && (
                                        <p className="mt-1">📋 {video.playlistName}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {pagination && pagination.pages > 1 && (
                    <div className="mt-8 flex items-center justify-center space-x-4">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="btn-secondary disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Page {page} of {pagination.pages}
                        </span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === pagination.pages}
                            className="btn-secondary disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoManagement;
