import api from './api';

export const videoService = {
    addVideo: async (url) => {
        const response = await api.post('/video/add', { url });
        return response.data;
    },

    addPlaylist: async (url) => {
        const response = await api.post('/video/playlist/add', { url });
        return response.data;
    },

    getVideos: async (playlistId = null) => {
        const params = playlistId ? { playlistId } : {};
        const response = await api.get('/video/list', { params });
        return response.data;
    },

    getPlaylists: async () => {
        const response = await api.get('/video/playlists');
        return response.data;
    },

    deleteVideo: async (videoId) => {
        const response = await api.delete(`/video/${videoId}`);
        return response.data;
    },

    reorderVideos: async (videoIds) => {
        const response = await api.put('/video/reorder', { videoIds });
        return response.data;
    },
};
