import axios from 'axios';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

// Parse YouTube video ID from URL
export const parseVideoId = (url) => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
        /youtube\.com\/embed\/([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
};

// Parse YouTube playlist ID from URL
export const parsePlaylistId = (url) => {
    const match = url.match(/[?&]list=([^&\n?#]+)/);
    return match ? match[1] : null;
};

// Convert ISO 8601 duration to seconds
export const parseDuration = (duration) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);

    return hours * 3600 + minutes * 60 + seconds;
};

// Fetch video details from YouTube API
export const fetchVideoDetails = async (videoId) => {
    try {
        const response = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
            params: {
                part: 'snippet,contentDetails',
                id: videoId,
                key: process.env.YOUTUBE_API_KEY
            }
        });

        if (!response.data.items || response.data.items.length === 0) {
            throw new Error('Video not found');
        }

        const video = response.data.items[0];
        return {
            videoId: video.id,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url,
            duration: parseDuration(video.contentDetails.duration)
        };
    } catch (error) {
        console.error('Error fetching video details:', error.message);
        throw new Error('Failed to fetch video details from YouTube');
    }
};

// Fetch playlist details and all videos
export const fetchPlaylistDetails = async (playlistId) => {
    try {
        // First, get playlist info
        const playlistResponse = await axios.get(`${YOUTUBE_API_BASE}/playlists`, {
            params: {
                part: 'snippet',
                id: playlistId,
                key: process.env.YOUTUBE_API_KEY
            }
        });

        if (!playlistResponse.data.items || playlistResponse.data.items.length === 0) {
            throw new Error('Playlist not found');
        }

        const playlistName = playlistResponse.data.items[0].snippet.title;

        // Then, get all videos in the playlist
        let videos = [];
        let nextPageToken = null;

        do {
            const response = await axios.get(`${YOUTUBE_API_BASE}/playlistItems`, {
                params: {
                    part: 'snippet,contentDetails',
                    playlistId: playlistId,
                    maxResults: 50,
                    pageToken: nextPageToken,
                    key: process.env.YOUTUBE_API_KEY
                }
            });

            const items = response.data.items || [];

            // Get video IDs to fetch durations
            const videoIds = items.map(item => item.contentDetails.videoId).join(',');

            if (videoIds) {
                const videoDetailsResponse = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
                    params: {
                        part: 'contentDetails',
                        id: videoIds,
                        key: process.env.YOUTUBE_API_KEY
                    }
                });

                const videoDetails = videoDetailsResponse.data.items || [];
                const durationMap = {};
                videoDetails.forEach(v => {
                    durationMap[v.id] = parseDuration(v.contentDetails.duration);
                });

                items.forEach((item, index) => {
                    videos.push({
                        videoId: item.contentDetails.videoId,
                        title: item.snippet.title,
                        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
                        duration: durationMap[item.contentDetails.videoId] || 0,
                        orderIndex: videos.length
                    });
                });
            }

            nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);

        return {
            playlistId,
            playlistName,
            videos
        };
    } catch (error) {
        console.error('Error fetching playlist details:', error.message);
        throw new Error('Failed to fetch playlist details from YouTube');
    }
};
