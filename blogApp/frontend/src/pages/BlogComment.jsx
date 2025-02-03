import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../utils/util";
import { getToken, removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const BlogComment = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [parentCommentId, setParentCommentId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/users/blogs/${blogId}`,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        setBlog(response.data[0]);
      } catch (err) {
        setError("Failed to fetch blog details.");
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/users/blogs/${blogId}/comments`,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        setComments(response.data);
      } catch (err) {
        setError("Failed to fetch comments.");
      }
    };

    fetchBlog();
    fetchComments();
  }, [blogId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
  
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/blogs/${blogId}/comments`,
        { content: newComment, parent_comment_id: parentCommentId },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
  
      const newAddedComment = response.data.message;

      setComments((prevComments) => {
        if (!parentCommentId) {
          return [...prevComments, newAddedComment]; // New root comment
        } else {
          const addReply = (commentsList) =>
            commentsList.map((comment) =>
              comment.comment_id === parentCommentId
                ? { ...comment, replies: [...(comment.replies || []), newAddedComment] }
                : { ...comment, replies: addReply(comment.replies || []) }
            );
          return addReply(prevComments);
        }
      });

      setNewComment("");
      setParentCommentId(null);
    } catch (err) {
      setError("Failed to add comment.");
    }
  };

  const handleReply = (parentId) => {
    setParentCommentId(parentId);
  };

  const renderComments = (commentsList, level = 0) => {
    return commentsList.map((comment) => (
      <div
        key={comment.comment_id}
        className={`p-4 border-b border-gray-200 ${level > 0 ? `ml-${level * 4}` : ""}`}
      >
        <p className="font-medium">{comment.user_name}</p>
        <p>{comment.content}</p>
        <button
          onClick={() => handleReply(comment.comment_id)}
          className="text-blue-500 mt-2"
        >
          Reply
        </button>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">{renderComments(comment.replies, level + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between mb-6">
        <button className="text-blue-500" onClick={() => navigate("/blog")}>
          Blog Display
        </button>
        <button
          className="text-red-500"
          onClick={() => {
            removeToken();
            navigate("/login");
          }}
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
            {comments.length > 0 ? renderComments(comments) : <p className="text-gray-500">No comments yet.</p>}
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
