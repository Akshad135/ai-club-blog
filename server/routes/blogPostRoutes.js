const express = require("express");
const router = express.Router();
const passport = require("passport");
const BlogPost = require("../model/BlogPost");

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Route to create a new blog post
router.post("/create", isAuthenticated, async (req, res) => {
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
    let posts;
    if (req.isAuthenticated()) {
      // If user is authenticated, fetch only their own blog posts
      posts = await BlogPost.find({ author: req.user._id });
    } else {
      // If user is not authenticated, fetch all blog posts
      posts = await BlogPost.find();
    }
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
    const post = await BlogPost.findById(postId);

    // Check if the logged-in user is the author of the blog post
    if (post.author !== req.user.googleId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this blog post" });
    }

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
router.delete("/delete/:id", isAuthenticated, async (req, res) => {
  const postId = req.params.id;
  try {
    await BlogPost.findByIdAndDelete(postId);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
