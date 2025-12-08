import api from './api';

export const adminService = {
    // User management
    getAllUsers: async (page = 1, limit = 10) => {
        const response = await api.get(`/admin/users?page=${page}&limit=${limit}`);
        return response.data;
    },

    deleteUser: async (userId) => {
        const response = await api.delete(`/admin/users/${userId}`);
        return response.data;
    },

    updateUserRole: async (userId, role) => {
        const response = await api.patch(`/admin/users/${userId}/role`, { role });
        return response.data;
    },

    // Statistics
    getPlatformStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    },

    // Video management
    getAllVideos: async (page = 1, limit = 20) => {
        const response = await api.get(`/admin/videos?page=${page}&limit=${limit}`);
        return response.data;
    },

    deleteVideo: async (videoId) => {
        const response = await api.delete(`/admin/videos/${videoId}`);
        return response.data;
    },
};
