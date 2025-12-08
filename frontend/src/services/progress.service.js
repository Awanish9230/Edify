import api from './api';

export const progressService = {
    updateProgress: async (videoId, watchedSeconds, totalDuration) => {
        const response = await api.put(`/progress/${videoId}`, {
            watchedSeconds,
            totalDuration,
        });
        return response.data;
    },

    getResumeTime: async (videoId) => {
        const response = await api.get(`/progress/${videoId}/resume`);
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/progress/stats');
        return response.data;
    },

    getVideosWithProgress: async () => {
        const response = await api.get('/progress/videos');
        return response.data;
    },
};
