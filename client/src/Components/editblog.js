// EditBlogPost.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditBlog.css"; // Import CSS file for styling

const EditBlogPost = ({ postId }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:6005/api/posts/${postId}`
        );
        const { title, content, author } = response.data;
        setFormData({ title, content, author });
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogPost();
  }, [postId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:6005/api/update/${postId}`, formData);
      // Handle success, maybe show a success message or redirect to the updated blog post
      console.log("Blog post updated successfully!");
      // Reload the page after updating the blog post
      window.location.reload();
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div className="edit-blog-container">
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBlogPost;
