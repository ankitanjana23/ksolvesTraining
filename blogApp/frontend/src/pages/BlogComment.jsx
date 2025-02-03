import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../utils/util";
import { getToken ,removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const BlogComment = () => {
  const { blogId } = useParams(); // Get blog ID from URL params
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [parentCommentId, setParentCommentId] = useState(null); // Track parent comment ID
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/blogs/${blogId}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setBlog(response.data[0]);
      } catch (err) {
        setError("Failed to fetch blog details.");
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/blogs/${blogId}/comments`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setComments(response.data);
      } catch (err) {
        setError("Failed to fetch comments.");
      }
    };

    fetchBlog();
    fetchComments();
  }, [blogId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;  // Trim string start and end

    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/blogs/${blogId}/comments`,
        { content: newComment, parent_comment_id: parentCommentId },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      
      // If it's a reply, update the parent comment, else add as a new comment
      if (parentCommentId) {
        setComments(prevComments => {
          return prevComments.map(comment => {
            if (comment.comment_id === parentCommentId) {
              return { ...comment, replies: [...comment.replies, response.data] };
            }
            return comment;
          });
        });
      } else {
        setComments([...comments, response.data]); // Append new top-level comment
      }

      setNewComment(""); // Clear input
      setParentCommentId(null); // Reset parent comment ID
    } catch (err) {
      setError("Failed to add comment.");
    }
  };

  const handleReply = (parentId) => {
    setParentCommentId(parentId); // Set the parent comment ID for nested replies
  };

  const handleLogout = () => {
    removeToken(); 
    navigate("/login"); 
  };

  const handleBlogCreation = () => {
    navigate("/blog"); 
  };

  const renderComments = (commentsList, parentKey = '') => {
    return commentsList.map(comment => (
      <div key={`${parentKey}-${comment.comment_id}`} className="p-4 border-b border-gray-200">
        <p className="font-medium">{comment.user_name}</p>
        <p>{comment.content}</p>
  
        <button 
          onClick={() => handleReply(comment.comment_id)} 
          className="text-blue-500 mt-2"
        >
          Reply
        </button>
  
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 mt-2">
            {renderComments(comment.replies, `${parentKey}-${comment.comment_id}`)} {/* Pass unique key for nested comments */}
          </div>
        )}
      </div>
    ));
  };  

  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between mb-6">
        <button
          className="text-blue-500"
          onClick={handleBlogCreation}
        >
          Blog Display
        </button>
        <button
          className="text-red-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {error && <p className="text-red-500">{error}</p>}
      {blog && (
        <div className="p-6 border rounded-lg bg-white shadow">
          <h2 className="text-3xl font-bold">{blog.title}</h2>
          <p className="text-gray-600 mb-4">{blog.content}</p>
          
          <h3 className="text-2xl font-bold mt-6">Comments</h3>
          <div className="space-y-2 mt-4">
            {comments.length > 0 ? (
              renderComments(comments) // Render nested comments
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>

          <div className="mt-6">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 border rounded-md"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogComment;
