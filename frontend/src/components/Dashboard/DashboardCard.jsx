const DashboardCard = ({ title, value, icon, gradient, subtitle }) => {
    return (
        <div className="card hover:scale-105 transform transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold mb-1">{value}</h3>
                    {subtitle && (
                        <p className="text-sm text-gray-500 dark:text-gray-500">{subtitle}</p>
                    )}
                </div>
                <div className={`text-5xl ${gradient ? 'animate-pulse-slow' : ''}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
