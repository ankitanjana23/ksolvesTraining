import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

function Admin() {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [usersRes, blogsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/users`), // Fetch all users
        axios.get(`${API_BASE_URL}/admin/blogs`), // Fetch all blogs
      ]);

      setUsers(usersRes.data);
      setBlogs(blogsRes.data);
    } catch (err) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveBlog = async (blogId) => {
    try {
      await axios.put(`${API_BASE_URL}/admin/approve-blog/${blogId}`);
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId ? { ...blog, status: "Approved" } : blog
        )
      );
    } catch (err) {
      alert("Failed to approve blog.");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

      {/* Users List */}
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Users List</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Blogs List */}
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Pending Blogs</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Author</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
                <td className="border border-gray-300 px-4 py-2">{blog.author}</td>
                <td className={`border border-gray-300 px-4 py-2 ${blog.status === "Pending" ? "text-red-500" : "text-green-500"}`}>
                  {blog.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {blog.status === "Pending" ? (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => handleApproveBlog(blog.id)}
                    >
                      Approve
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">Approved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
