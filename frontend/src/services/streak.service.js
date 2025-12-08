import api from './api';

export const streakService = {
    updateStreak: async (watchTimeSeconds) => {
        const response = await api.post('/streak/update', { watchTimeSeconds });
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/streak/stats');
        return response.data;
    },

    getWeeklyData: async () => {
        const response = await api.get('/streak/weekly');
        return response.data;
    },
};
