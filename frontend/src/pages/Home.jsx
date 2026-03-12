import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const Home = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary-500/10 to-transparent blur-3xl -z-10"></div>
                
                <div className="animate-fade-in space-y-8">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-semibold tracking-wide uppercase border border-primary-200 dark:border-primary-800">
                        ✨ Next generation learning
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                        Master Any Skill with <br />
                        <span className="gradient-text">Personalized Video Learning</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                        Edify helps you organize, track, and master YouTube educational content with precision. Turn passive watching into active mastery.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link to="/register" className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
                            Get Started for Free
                        </Link>
                        <Link to="/login" className="btn-secondary w-full sm:w-auto text-lg px-8 py-4">
                            Welcome Back
                        </Link>
                    </div>
                </div>

                {/* Dashboard Preview / Mockup */}
                <div className="mt-20 relative w-full max-w-5xl group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                        <div className="text-6xl group-hover:scale-110 transition-transform duration-500">📚 ⚡️ 📊</div>
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-left">
                            <p className="text-white font-bold text-xl">Interactive Dashboard</p>
                            <p className="text-gray-300">Track streaks, watch time, and completion rates effortlessly.</p>
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
