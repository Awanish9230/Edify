import { useState } from 'react';
import { videoService } from '../../services/video.service';

const AddVideoModal = ({ isOpen, onClose, onVideoAdded }) => {
    const [url, setUrl] = useState('');
    const [isPlaylist, setIsPlaylist] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (isPlaylist) {
                const response = await videoService.addPlaylist(url);
                setSuccess(`✅ Added ${response.data.videosAdded} videos from playlist!`);
            } else {
                await videoService.addVideo(url);
                setSuccess('✅ Video added successfully!');
            }

            setUrl('');
            setTimeout(() => {
                onVideoAdded();
                onClose();
                setSuccess('');
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add video/playlist');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-md w-full animate-slide-up">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">➕ Add Video</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
                    >
                        ×
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 rounded-lg">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">YouTube URL</label>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="input-field"
                            placeholder="https://www.youtube.com/watch?v=..."
                            required
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Paste a YouTube video or playlist URL
                        </p>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isPlaylist"
                            checked={isPlaylist}
                            onChange={(e) => setIsPlaylist(e.target.checked)}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor="isPlaylist" className="ml-2 text-sm">
                            This is a playlist URL
                        </label>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Adding...' : isPlaylist ? 'Add Playlist' : 'Add Video'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVideoModal;
