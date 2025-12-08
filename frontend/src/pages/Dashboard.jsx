import { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import DashboardCard from '../components/Dashboard/DashboardCard';
import StreakDisplay from '../components/Dashboard/StreakDisplay';
import WeeklyChart from '../components/Dashboard/WeeklyChart';
import { progressService } from '../services/progress.service';
import { streakService } from '../services/streak.service';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [streakStats, setStreakStats] = useState(null);
    const [weeklyData, setWeeklyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [progressResponse, streakResponse, weeklyResponse] = await Promise.all([
                progressService.getStats(),
                streakService.getStats(),
                streakService.getWeeklyData(),
            ]);

            setStats(progressResponse.data);
            setStreakStats(streakResponse.data);
            setWeeklyData(weeklyResponse.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 60 / 60);
        const minutes = Math.floor((seconds / 60) % 60);

        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 dark:bg-dark-card rounded w-1/4"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-32 bg-gray-200 dark:bg-dark-card rounded-xl"></div>
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
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-4xl font-bold mb-2">📊 Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Track your learning progress and achievements</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <DashboardCard
                        title="Total Videos"
                        value={stats?.totalVideos || 0}
                        icon="📺"
                        gradient
                    />
                    <DashboardCard
                        title="Completed"
                        value={stats?.completedVideos || 0}
                        icon="✅"
                        subtitle={`${stats?.inProgressVideos || 0} in progress`}
                    />
                    <DashboardCard
                        title="Watch Time"
                        value={formatTime(stats?.totalWatchTimeSeconds || 0)}
                        icon="⏱️"
                    />
                    <DashboardCard
                        title="Today's Time"
                        value={formatTime(streakStats?.todayWatchTimeSeconds || 0)}
                        icon="🔥"
                        gradient
                    />
                </div>

                {/* Streak and Weekly Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <StreakDisplay
                        currentStreak={streakStats?.currentStreak || 0}
                        bestStreak={streakStats?.bestStreak || 0}
                        metDailyGoal={streakStats?.metDailyGoal || false}
                    />
                    <WeeklyChart weeklyData={weeklyData} />
                </div>

                {/* Quick Actions */}
                <div className="card">
                    <h3 className="text-xl font-bold mb-4">🚀 Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={() => navigate('/videos')}
                            className="btn-primary text-left flex items-center justify-between"
                        >
                            <span>📚 Browse My Videos</span>
                            <span>→</span>
                        </button>
                        <button
                            onClick={() => navigate('/videos')}
                            className="btn-secondary text-left flex items-center justify-between"
                        >
                            <span>➕ Add New Video</span>
                            <span>→</span>
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;
