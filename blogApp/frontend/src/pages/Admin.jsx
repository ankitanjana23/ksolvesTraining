import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/util";
import { getToken, removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchBlogs = async () =>{
          try{
            const response = await axios.get(`${API_BASE_URL}/admin/blogs`, {
              headers: { Authorization: `Bearer ${getToken()}` },
            })
            setBlogs(response.data)
          }
          catch(err){
            console.error("Failed to fetch blogs:", err)
          }
    }
      fetchBlogs();
  }, []);

  const handleAction = async (id, status) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/admin/blogs/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      // ✅ Fix: Use function-based state update to ensure the latest data is used
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error("Failed to update blog status:", err);
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between mb-6">
        <button className="text-red-500" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>
      <div className="space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="p-4 border rounded-lg bg-white shadow">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-600">{blog.content}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  className="bg-green-500 text-white p-2 rounded"
                  onClick={() => handleAction(blog.id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleAction(blog.id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No pending blogs to review.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
