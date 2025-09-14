// post.js
const express = require("express");
const router = express.Router();
// Mongoose model
const Post = require("../models/post");

// GET - Get all posts
router.get("/api/posts", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});

// GET - Get a specific post by ID
router.get("/api/posts/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});

// POST - Create a new post
router.post("/api/posts", async (req, res) => {
    try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            return res.status(400).json({ error: "Title, content, and author are required" });
        }
        const newPost = new Post({ title, content, author });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully", postId: newPost._id });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});

// PUT - Update a post
router.put("/api/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            { title, content }, 
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});

module.exports = router;
