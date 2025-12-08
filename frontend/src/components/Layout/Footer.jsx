const Footer = () => {
    return (
        <footer className="bg-white dark:bg-dark-card border-t border-gray-200 dark:border-gray-700 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl">📚</span>
                        <span className="text-lg font-bold gradient-text">Edify</span>
                    </div>

                    <div className="text-center md:text-left">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            © {new Date().getFullYear()} APM Ltd. All rights reserved.
                        </p>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
