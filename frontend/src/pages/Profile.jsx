import { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import DashboardCard from '../components/Dashboard/DashboardCard';
import { useAuth } from '../contexts/AuthContext';
import { progressService } from '../services/progress.service';
import { streakService } from '../services/streak.service';

const Profile = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [streakStats, setStreakStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const [progressResponse, streakResponse] = await Promise.all([
                    progressService.getStats(),
                    streakService.getStats(),
                ]);
                setStats(progressResponse.data);
                setStreakStats(streakResponse.data);
            } catch (error) {
                console.error('Error fetching profile stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <div className="animate-pulse space-y-8">
                        <div className="flex items-center space-x-6">
                            <div className="w-24 h-24 bg-gray-200 dark:bg-zinc-800 rounded-full"></div>
                            <div className="space-y-3 flex-1">
                                <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-1/4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/3"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-xl"></div>
                            <div className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
            <Navbar />
            
            <main className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full blur opacity-25"></div>
                        <div className="relative w-32 h-32 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-5xl text-white font-bold shadow-2xl border-4 border-white dark:border-zinc-900">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <button className="absolute bottom-1 right-1 bg-white dark:bg-zinc-800 p-2 rounded-full shadow-lg border border-gray-100 dark:border-zinc-700 hover:scale-110 transition-transform">
                            📸
                        </button>
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-extrabold mb-2">{user?.name}</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 flex items-center justify-center md:justify-start gap-2">
                            📧 {user?.email}
                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded text-xs uppercase tracking-wider font-bold">
                                {user?.role || 'User'}
                            </span>
                        </p>
                        
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <div className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-lg text-primary-700 dark:text-primary-400 font-semibold flex items-center gap-2">
                                📚 {stats?.totalVideos || 0} Total Videos
                            </div>
                            <div className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-lg text-purple-700 dark:text-purple-400 font-semibold flex items-center gap-2">
                                🔥 {streakStats?.currentStreak || 0} Day Streak
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <h2 className="text-2xl font-bold mb-6">Activity Snapshot</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <DashboardCard 
                        title="Completed Mastery"
                        value={`${stats?.completedVideos || 0}`}
                        icon="🎯"
                        subtitle={`Out of ${stats?.totalVideos || 0} videos`}
                    />
                    <DashboardCard 
                        title="Focus Time"
                        value={formatTime(stats?.totalWatchTimeSeconds || 0)}
                        icon="⏱️"
                        subtitle="Total duration spent learning"
                    />
                </div>

                {/* Account Settings Section */}
                <div className="card">
                    <h3 className="text-xl font-bold mb-6 border-b border-gray-100 dark:border-zinc-800 pb-4">Account Details</h3>
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 dark:border-zinc-900 pb-4">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Display Name</p>
                                <p className="font-semibold">{user?.name}</p>
                            </div>
                            <button className="text-primary-600 dark:text-primary-400 font-medium hover:underline text-sm">Update</button>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 dark:border-zinc-900 pb-4">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                                <p className="font-semibold">{user?.email}</p>
                            </div>
                            <span className="text-gray-400 text-sm italic">Contact support to change email</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Password</p>
                                <p className="font-semibold">••••••••••••</p>
                            </div>
                            <button className="text-primary-600 dark:text-primary-400 font-medium hover:underline text-sm">Change</button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Profile;
