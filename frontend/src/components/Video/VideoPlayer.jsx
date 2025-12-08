import { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { progressService } from '../../services/progress.service';
import { streakService } from '../../services/streak.service';

const VideoPlayer = ({ videoId, videoTitle, duration, onNext, onPrevious }) => {
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [resumeTime, setResumeTime] = useState(0);
    const [showResumePrompt, setShowResumePrompt] = useState(false);
    const progressIntervalRef = useRef(null);
    const watchStartTimeRef = useRef(null);

    useEffect(() => {
        // Fetch resume time when video changes
        const fetchResumeTime = async () => {
            try {
                const response = await progressService.getResumeTime(videoId);
                const { watchedSeconds, isCompleted } = response.data;

                if (watchedSeconds > 10 && !isCompleted) {
                    setResumeTime(watchedSeconds);
                    setShowResumePrompt(true);
                }
            } catch (error) {
                console.error('Error fetching resume time:', error);
            }
        };

        fetchResumeTime();

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, [videoId]);

    const onReady = (event) => {
        setPlayer(event.target);
    };

    const handleResume = () => {
        if (player && resumeTime > 0) {
            player.seekTo(resumeTime, true);
        }
        setShowResumePrompt(false);
    };

    const handleStartFromBeginning = () => {
        setResumeTime(0);
        setShowResumePrompt(false);
    };

    const onStateChange = (event) => {
        const playerState = event.data;

        // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
        if (playerState === 1) {
            // Playing
            setIsPlaying(true);
            watchStartTimeRef.current = Date.now();

            // Start progress tracking interval (every 5 seconds)
            if (!progressIntervalRef.current) {
                progressIntervalRef.current = setInterval(() => {
                    saveProgress();
                }, 5000);
            }
        } else {
            // Paused or stopped
            setIsPlaying(false);

            // Save progress immediately when paused
            if (playerState === 2) {
                saveProgress();
            }

            // Clear interval
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }

            // Update streak when video ends
            if (playerState === 0) {
                updateStreak();
            }
        }
    };

    const saveProgress = async () => {
        if (!player) return;

        try {
            const currentTime = player.getCurrentTime();
            const totalDuration = player.getDuration();

            await progressService.updateProgress(videoId, Math.floor(currentTime), Math.floor(totalDuration));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    };

    const updateStreak = async () => {
        if (!watchStartTimeRef.current) return;

        try {
            const watchDuration = Math.floor((Date.now() - watchStartTimeRef.current) / 1000);
            if (watchDuration > 0) {
                await streakService.updateStreak(watchDuration);
            }
            watchStartTimeRef.current = null;
        } catch (error) {
            console.error('Error updating streak:', error);
        }
    };

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0, // Don't show related videos
            modestbranding: 1, // Minimal YouTube branding
            iv_load_policy: 3, // Hide annotations
            playsinline: 1,
            enablejsapi: 1,
            start: showResumePrompt ? 0 : resumeTime,
        },
    };

    return (
        <div className="w-full">
            {showResumePrompt && (
                <div className="mb-4 p-4 bg-primary-100 dark:bg-primary-900/30 border border-primary-400 dark:border-primary-700 rounded-lg">
                    <p className="text-primary-800 dark:text-primary-300 mb-3">
                        ⏰ Continue watching from {Math.floor(resumeTime / 60)}:{String(Math.floor(resumeTime % 60)).padStart(2, '0')}?
                    </p>
                    <div className="flex space-x-3">
                        <button onClick={handleResume} className="btn-primary text-sm">
                            Continue
                        </button>
                        <button onClick={handleStartFromBeginning} className="btn-secondary text-sm">
                            Start from beginning
                        </button>
                    </div>
                </div>
            )}

            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden shadow-2xl">
                    <YouTube
                        videoId={videoId}
                        opts={opts}
                        onReady={onReady}
                        onStateChange={onStateChange}
                        className="w-full h-full"
                    />
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <button
                    onClick={onPrevious}
                    disabled={!onPrevious}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ⬅️ Previous
                </button>

                <h2 className="text-lg font-semibold text-center flex-1 mx-4">{videoTitle}</h2>

                <button
                    onClick={onNext}
                    disabled={!onNext}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next ➡️
                </button>
            </div>
        </div>
    );
};

export default VideoPlayer;
