const express = require("express");
const router = express.Router();
const BlogPost = require("../model/BlogPost");

// Route to create a new blog post
router.post("/create", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newPost = await BlogPost.create({ title, content, author });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all blog posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update a blog post by ID
router.put("/update/:id", async (req, res) => {
  const postId = req.params.id;
  const { title, content, author } = req.body;
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      postId,
      { title, content, author },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to delete a blog post by ID
router.delete("/delete/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    await BlogPost.findByIdAndDelete(postId);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
