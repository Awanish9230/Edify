import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white dark:bg-dark-card shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/dashboard" className="flex items-center space-x-2">
                        <span className="text-2xl">📚</span>
                        <span className="text-xl font-bold gradient-text">Edify</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/dashboard"
                            className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/videos"
                            className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
                        >
                            My Videos
                        </Link>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? '☀️' : '🌙'}
                        </button>

                        <div className="relative group">
                            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors">
                                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden sm:block">{user?.name}</span>
                            </button>

                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                    <p className="font-semibold">{user?.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{user?.email}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors text-red-600 dark:text-red-400"
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
