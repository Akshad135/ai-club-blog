import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/CreateBlog.css";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:6005/api/create", {
        title,
        content,
        author,
      });

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
