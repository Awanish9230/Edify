import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-dark-border sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <span className="text-xl group-hover:rotate-6 transition-transform">📚</span>
                        <span className="text-lg font-bold gradient-text">Edify</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors hidden sm:block font-medium"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/videos"
                                    className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors hidden sm:block font-medium"
                                >
                                    My Videos
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn-primary py-2 px-5 hidden sm:block"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? '☀️' : '🌙'}
                        </button>

                        {user && (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all">
                                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden md:block font-medium">{user?.name}</span>
                                </button>

                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right group-hover:translate-y-0 translate-y-2">
                                    <div className="p-4 border-b border-gray-100 dark:border-dark-border">
                                        <p className="font-semibold">{user?.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                                    </div>
                                    <div className="p-2">
                                        <Link
                                            to="/profile"
                                            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors text-sm font-medium"
                                        >
                                            👤 Profile Settings
                                        </Link>
                                        {user?.role === 'admin' && (
                                            <Link
                                                to="/admin"
                                                className="block w-full text-left px-3 py-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-700 dark:text-purple-400 transition-colors text-sm font-medium"
                                            >
                                                🔧 Admin Panel
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors text-sm font-medium"
                                        >
                                            🚪 Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
