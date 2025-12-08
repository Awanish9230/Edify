import { useState, useEffect } from 'react';
import { adminService } from '../../services/admin.service';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await adminService.getPlatformStats();
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-dark-bg p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 dark:bg-dark-card rounded w-1/4"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-32 bg-gray-200 dark:bg-dark-card rounded-xl"></div>
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
                    <h1 className="text-4xl font-bold mb-2">🔧 Admin Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Platform overview and statistics</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm">Total Users</p>
                                <p className="text-3xl font-bold mt-2">{stats?.totalUsers || 0}</p>
                            </div>
                            <div className="text-5xl opacity-50">👥</div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm">Total Videos</p>
                                <p className="text-3xl font-bold mt-2">{stats?.totalVideos || 0}</p>
                            </div>
                            <div className="text-5xl opacity-50">📺</div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm">Completed Videos</p>
                                <p className="text-3xl font-bold mt-2">{stats?.completedVideos || 0}</p>
                            </div>
                            <div className="text-5xl opacity-50">✅</div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm">New Users Today</p>
                                <p className="text-3xl font-bold mt-2">{stats?.usersToday || 0}</p>
                            </div>
                            <div className="text-5xl opacity-50">🆕</div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-pink-500 to-pink-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-pink-100 text-sm">Total Watch Time</p>
                                <p className="text-3xl font-bold mt-2">{formatTime(stats?.totalWatchTime || 0)}</p>
                            </div>
                            <div className="text-5xl opacity-50">⏱️</div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-indigo-100 text-sm">Total Progress Records</p>
                                <p className="text-3xl font-bold mt-2">{stats?.totalProgress || 0}</p>
                            </div>
                            <div className="text-5xl opacity-50">📊</div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 card">
                    <h3 className="text-xl font-bold mb-4">🚀 Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="/admin/users" className="btn-primary text-center">
                            👥 Manage Users
                        </a>
                        <a href="/admin/videos" className="btn-secondary text-center">
                            📺 Manage Videos
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
