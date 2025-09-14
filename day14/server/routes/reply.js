// reply of comment 
const express = require("express");
const router = express.Router();

// Mongoose model
const Comment = require("../models/comment");   
const Post = require("../models/post");

// GET - Get all replies for a comment
router.get("/api/posts/:postId/comments/:commentId/replies", async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        // Check if the comment exists
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        const replies = await Comment.find({ parent: commentId }).sort({ createdAt: -1 });
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});

// POST - Add a reply to a comment
router.post("/api/posts/:postId/comments/:commentId/replies", async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const { username, content } = req.body;
        if (!username || !content) {
            return res.status(400).json({ error: "Username and content are required" });
        }
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        // Check if the comment exists
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        const newReply = new Comment({ username, content, parent: commentId });
        await newReply.save();
        res.status(201).json({ message: "Reply added successfully", replyId: newReply._id });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
});

module.exports = router;
