import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import EditBlogPost from "./editblog";
import CreateBlogPost from "./CreateBlog";
import "../Styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:6005/api/posts");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:6005/api/delete/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEditBlog = (blogId) => {
    setEditPostId(blogId);
  };

  const handleCreateBlog = () => {
    setShowCreateForm(true);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Dashboard</h1>

      {showCreateForm ? (
        <CreateBlogPost />
      ) : (
        <div>
          {blogs.length === 0 ? (
            <p>No blog posts available.</p>
          ) : (
            <div>
              <h2>Your Blogs</h2>
              <div className="blog-cards">
                {blogs.map((blog) => (
                  <div key={blog._id} className="blog-card">
                    {editPostId === blog._id ? (
                      <EditBlogPost postId={blog._id} />
                    ) : (
                      <>
                        <h3>{blog.title}</h3>
                        <div
                          style={{
                            maxHeight: "325px",

                            overflow: "auto",
                          }}
                        >
                          <p>{blog.content}</p>
                        </div>
                        <p>Author: {blog.author}</p>
                        <div className="blog-buttons">
                          <button onClick={() => handleDeleteBlog(blog._id)}>
                            Delete
                          </button>
                          <button onClick={() => handleEditBlog(blog._id)}>
                            Edit
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <Link
            to="/create"
            className="create-blog-button"
            onClick={handleCreateBlog}
          >
            Create Blog
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
