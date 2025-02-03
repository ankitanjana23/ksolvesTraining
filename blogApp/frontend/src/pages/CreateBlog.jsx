import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/util";
import { getToken ,removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        `${API_BASE_URL}/users/blog`,
        { title, content },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      navigate("/blog");
    } catch (err) {
      setError("Failed to create blog.");
    }
  };

  const handleBlogCreation = () =>{
    navigate("/blog");
  }

  const handleLogout = () =>{
    removeToken(); 
    navigate("/login"); 
  }

  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between mb-6">
        <button
          className="text-blue-500"
          onClick={handleBlogCreation}
        >
          All Blogs
        </button>
        <button
          className="text-red-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <h2 className="text-3xl font-bold mb-6">Create Blog</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded" required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
