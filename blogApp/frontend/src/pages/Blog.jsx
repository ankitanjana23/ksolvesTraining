import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/util";
import { getToken, removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { nanoid } from "nanoid";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigation hook

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/blogs`, {
          headers: { Authorization: `Bearer ${getToken()}` }, // Attach token
        });
        setBlogs(response.data);
      } catch (err) {
        setError("Failed to fetch blogs. Please login again.");
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  const handleLogout = () => {
    removeToken(); 
    navigate("/login"); 
  };

  const handleBlogCreation = () => {
    navigate("/create-blog"); 
  };

  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between mb-6">
        <button
          className="text-blue-500"
          onClick={handleBlogCreation}
        >
          Blog Creation
        </button>
        <button
          className="text-red-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <h2 className="text-3xl font-bold mb-6">Approved Blogs</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog.id || nanoid()} className="p-4 border rounded-lg bg-white shadow">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-600">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
