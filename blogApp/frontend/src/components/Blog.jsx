import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

function BlogSubmission() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You must be logged in to submit a blog.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`${API_BASE_URL}/blogs`, {
                title,
                content,
                status: "pending"  // Blogs are stored as "pending" until admin approves
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage('Blog submitted successfully! Awaiting admin approval.');
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error submitting blog:', error);
            setMessage('Failed to submit blog. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Submit a Blog</h2>

                {message && <p className="text-center text-blue-600 mb-4">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Blog Title</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Blog Content</label>
                        <textarea
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows="6"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Blog'}
                    </button>
                </form>

                {/* <div className="mt-4 text-center">
                    <button 
                        className="text-blue-500 hover:underline"
                        onClick={() => navigate('/blogs')}
                    >
                        View Blogs
                    </button>
                </div> */}
            </div>
        </div>
    );
}

export default BlogSubmission;
