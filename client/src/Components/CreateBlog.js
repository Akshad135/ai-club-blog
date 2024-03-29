import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css"; // Import CSS file for styling

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend to create a new blog post
      await axios.post("http://localhost:6005/api/create", {
        title,
        content,
        author,
      });
      // Redirect the user to the dashboard after successfully creating a blog post
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <div className="create-blog-container">
      <div className="create-blog-card">
        <h1 className="create-blog-title">Create Blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              className="form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              className="form-control"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
