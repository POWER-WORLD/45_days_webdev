// comment on post 
const express = require("express");
const router = express.Router();

// Mongoose model
const Comment = require("../models/comment");
const Post = require("../models/post");

// GET - Get all comments for a post
router.get("/api/posts/:postId/comments", async (req, res) => {
    try {
        const { postId } = req.params;
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const comments = await Comment.find({ parent: { $exists: false } }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});

// POST - Add a comment to a post
router.post("/api/posts/:postId/comments", async (req, res) => {
    try {
        const { postId } = req.params;
        const { username, content } = req.body; 
        if (!username || !content) {
            return res.status(400).json({ error: "Username and content are required" });
        }
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const newComment = new Comment({ username, content });
        await newComment.save();
        res.status(201).json({ message: "Comment added successfully", commentId: newComment._id });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});

module.exports = router;