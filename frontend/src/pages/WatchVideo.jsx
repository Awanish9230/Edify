import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import VideoPlayer from '../components/Video/VideoPlayer';
import { progressService } from '../services/progress.service';

const WatchVideo = () => {
    const { videoId } = useParams();
    const location = useLocation();
    const [video, setVideo] = useState(location.state?.video || null);
    const [allVideos, setAllVideos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchVideos();
    }, []);

    useEffect(() => {
        if (allVideos.length > 0 && videoId) {
            const index = allVideos.findIndex(v => v.videoId === videoId);
            if (index !== -1) {
                setCurrentIndex(index);
                setVideo(allVideos[index]);
            }
        }
    }, [videoId, allVideos]);

    const fetchVideos = async () => {
        try {
            const response = await progressService.getVideosWithProgress();
            setAllVideos(response.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const handleNext = () => {
        if (currentIndex < allVideos.length - 1) {
            const nextVideo = allVideos[currentIndex + 1];
            setVideo(nextVideo);
            setCurrentIndex(currentIndex + 1);
            window.history.pushState({}, '', `/watch/${nextVideo.videoId}`);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const prevVideo = allVideos[currentIndex - 1];
            setVideo(prevVideo);
            setCurrentIndex(currentIndex - 1);
            window.history.pushState({}, '', `/watch/${prevVideo.videoId}`);
        }
    };

    if (!video) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📺</div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">Video not found</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <VideoPlayer
                    videoId={video.videoId}
                    videoTitle={video.title}
                    duration={video.duration}
                    onNext={currentIndex < allVideos.length - 1 ? handleNext : null}
                    onPrevious={currentIndex > 0 ? handlePrevious : null}
                />

                {video.playlistName && (
                    <div className="mt-6 card">
                        <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400">
                            📋 From playlist: {video.playlistName}
                        </h3>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default WatchVideo;
