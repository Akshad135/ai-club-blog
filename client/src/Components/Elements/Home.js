import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:6005/api/posts");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Home Page</h1>
      <div>
        {blogs.length === 0 ? (
          <p>No blog posts available.</p>
        ) : (
          <div>
            <h2>All Blogs</h2>
            <div className="blog-cards">
              {blogs.map((blog) => (
                <div key={blog._id} className="blog-card">
                  <h3>{blog.title}</h3>
                  <div style={{ maxHeight: "325px", overflow: "auto" }}>
                    <p>{blog.content}</p>
                  </div>
                  <p>Author: {blog.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
