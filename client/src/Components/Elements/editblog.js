import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/EditBlog.css";

const EditBlogPost = ({ postId }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:6005/api/posts/${postId}`
        );
        const { title, content } = response.data;
        setFormData({ title, content });
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:6005/api/update/${postId}`, formData);

      console.log("Blog post updated successfully!");

      window.location.reload();
    } catch (error) {
      console.log(error);
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
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBlogPost;
