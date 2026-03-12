import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const Home = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="absolute top-0 left-1/4 w-full h-[500px] bg-gradient-to-br from-primary-500/10 to-purple-500/10 blur-3xl -z-10"></div>
                
                <div className="animate-fade-in space-y-6 text-center lg:text-left">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-semibold tracking-wide uppercase border border-primary-200 dark:border-primary-800">
                        ✨ Next generation learning
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
                        Master Any Skill with <br />
                        <span className="gradient-text">Personalized Video Learning</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto lg:mx-0 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        Edify helps you organize, track, and master YouTube educational content with precision. Turn passive watching into active mastery.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                        <Link to="/register" className="btn-primary w-full sm:w-auto text-base px-6 py-3 text-center">
                            Get Started for Free
                        </Link>
                        <Link to="/login" className="btn-secondary w-full sm:w-auto text-base px-6 py-3 text-center">
                            Welcome Back
                        </Link>
                    </div>
                </div>

                <div className="relative w-full group animate-fade-in">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-purple-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-2xl overflow-hidden aspect-video flex flex-col transform lg:rotate-2 group-hover:rotate-0 transition-transform duration-700">
                        {/* Mock Nav */}
                        <div className="h-12 border-b border-gray-100 dark:border-zinc-800 flex items-center px-4 space-x-4">
                            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                        </div>
                        
                        {/* Mock Content */}
                        <div className="flex-1 p-6 grid grid-cols-3 gap-4">
                            <div className="col-span-2 space-y-4">
                                <div className="h-48 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-dashed border-gray-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10"></div>
                                    <div className="text-4xl animate-bounce">📊</div>
                                    <div className="absolute bottom-4 left-4 right-4 h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                        <div className="w-2/3 h-full bg-primary-500 shadow-lg shadow-primary-500/50"></div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-24 bg-white dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700 p-4">
                                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg mb-2 flex items-center justify-center">🔥</div>
                                        <div className="h-2 w-12 bg-gray-200 dark:bg-zinc-700 rounded"></div>
                                    </div>
                                    <div className="h-24 bg-white dark:bg-zinc-800 rounded-xl border border-gray-100 dark:border-zinc-700 p-4">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-2 flex items-center justify-center">⏱️</div>
                                        <div className="h-2 w-12 bg-gray-200 dark:bg-zinc-700 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-full bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-200 dark:border-zinc-700 p-4 flex flex-col space-y-3">
                                    <div className="h-3 w-3/4 bg-gray-200 dark:bg-zinc-700 rounded"></div>
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <div className="w-8 h-8 rounded bg-gray-200 dark:bg-zinc-700"></div>
                                            <div className="flex-1 space-y-1">
                                                <div className="h-2 w-full bg-gray-200 dark:bg-zinc-700 rounded"></div>
                                                <div className="h-1.5 w-1/2 bg-gray-100 dark:bg-zinc-800 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                        <div className="absolute inset-x-0 bottom-0 p-8 text-left">
                            <p className="text-gray-900 dark:text-white font-bold text-2xl mb-1">Interactive Dashboard</p>
                            <p className="text-gray-600 dark:text-gray-400">Track streaks, watch time, and completion rates effortlessly.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-50 dark:bg-zinc-950/50 border-y border-gray-100 dark:border-zinc-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to <span className="text-primary-600">Grow</span></h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">Powerful tools designed to help you stay consistent and achieve your learning goals faster.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="card border-none bg-white dark:bg-zinc-900 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-3xl mb-6">📺</div>
                            <h3 className="text-xl font-bold mb-3">YouTube Integration</h3>
                            <p className="text-gray-600 dark:text-gray-400">Add any video or entire playlists simply by pasting a link. We handle the rest.</p>
                        </div>
                        
                        <div className="card border-none bg-white dark:bg-zinc-900 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-3xl mb-6">🔥</div>
                            <h3 className="text-xl font-bold mb-3">Streak Tracking</h3>
                            <p className="text-gray-600 dark:text-gray-400">Keep the momentum going. Visual streaks motivate you to learn every single day.</p>
                        </div>
                        
                        <div className="card border-none bg-white dark:bg-zinc-900 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-3xl mb-6">📈</div>
                            <h3 className="text-xl font-bold mb-3">Progress Analytics</h3>
                            <p className="text-gray-600 dark:text-gray-400">Deep insights into your learning habits. See exactly how much you've mastered.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                    <h2 className="text-4xl font-bold mb-6">Ready to upgrade your mind?</h2>
                    <p className="text-xl text-primary-50 mb-10 opacity-90">Join thousands of learners who are taking control of their education.</p>
                    <Link to="/register" className="inline-block px-10 py-4 bg-white text-primary-600 font-bold rounded-full hover:shadow-xl transform hover:scale-105 transition-all text-lg">
                        Create Your Library Now
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
