import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 p-4">
            <div className="text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-white mb-4">404</h1>
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-3xl font-bold text-white mb-2">Page Not Found</h2>
                    <p className="text-white text-lg mb-8">
                        Oops! The page you're looking for doesn't exist.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        to="/dashboard"
                        className="inline-block px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        🏠 Go to Dashboard
                    </Link>

                    <div className="text-white text-sm">
                        <p>Need help? Here are some useful links:</p>
                        <div className="mt-4 space-x-4">
                            <Link to="/videos" className="hover:underline">
                                📺 My Videos
                            </Link>
                            <Link to="/login" className="hover:underline">
                                🔐 Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
