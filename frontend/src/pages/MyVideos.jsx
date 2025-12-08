import { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import VideoList from '../components/Video/VideoList';
import AddVideoModal from '../components/Video/AddVideoModal';
import { progressService } from '../services/progress.service';
import { useNavigate } from 'react-router-dom';

const MyVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await progressService.getVideosWithProgress();
            setVideos(response.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVideoClick = (video) => {
        navigate(`/watch/${video.videoId}`, { state: { video } });
    };

    const handleVideoAdded = () => {
        fetchVideos();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 dark:bg-dark-card rounded w-1/4"></div>
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
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8 animate-fade-in">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">📚 My Videos</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {videos.length} {videos.length === 1 ? 'video' : 'videos'} in your library
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn-primary"
                    >
                        ➕ Add Video
                    </button>
                </div>

                <VideoList videos={videos} onVideoClick={handleVideoClick} onVideoDeleted={fetchVideos} />
            </div>

            <AddVideoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onVideoAdded={handleVideoAdded}
            />

            <Footer />
        </div>
    );
};

export default MyVideos;
