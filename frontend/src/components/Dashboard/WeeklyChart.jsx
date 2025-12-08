const WeeklyChart = ({ weeklyData }) => {
    if (!weeklyData || weeklyData.length === 0) {
        return null;
    }

    const maxTime = Math.max(...weeklyData.map(d => d.watchTimeSeconds), 1);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <div className="card">
            <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="mr-2">📊</span>
                Weekly Activity
            </h3>

            <div className="flex items-end justify-between space-x-2 h-48">
                {weeklyData.map((day, index) => {
                    const heightPercent = (day.watchTimeSeconds / maxTime) * 100;
                    const isToday = index === weeklyData.length - 1;

                    return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                            <div className="w-full flex items-end justify-center h-40 mb-2">
                                <div
                                    className={`w-full rounded-t-lg transition-all duration-500 ${day.metDailyGoal
                                            ? 'bg-gradient-to-t from-green-500 to-green-400'
                                            : 'bg-gradient-to-t from-primary-500 to-primary-400'
                                        } ${isToday ? 'ring-2 ring-purple-500' : ''}`}
                                    style={{ height: `${heightPercent}%` }}
                                    title={formatTime(day.watchTimeSeconds)}
                                />
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                {day.dayName}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-primary-400 rounded mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Active</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-400 rounded mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400">Goal Met (10+ min)</span>
                </div>
            </div>
        </div>
    );
};

export default WeeklyChart;
