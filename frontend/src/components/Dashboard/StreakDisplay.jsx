const StreakDisplay = ({ currentStreak, bestStreak, metDailyGoal }) => {
    return (
        <div className="card">
            <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="mr-2">🔥</span>
                Learning Streak
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                    <div className="text-5xl font-bold text-orange-500 mb-2">
                        {currentStreak}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Current Streak</p>
                </div>
                <div className="text-center">
                    <div className="text-5xl font-bold text-purple-500 mb-2">
                        {bestStreak}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Best Streak</p>
                </div>
            </div>

            <div className={`p-4 rounded-lg text-center ${metDailyGoal
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>
                {metDailyGoal ? (
                    <div className="flex items-center justify-center">
                        <span className="text-2xl mr-2">✅</span>
                        <span className="font-semibold">Daily goal achieved!</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center">
                        <span className="text-2xl mr-2">⏰</span>
                        <span className="font-semibold">Watch 10 minutes to maintain streak</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StreakDisplay;
