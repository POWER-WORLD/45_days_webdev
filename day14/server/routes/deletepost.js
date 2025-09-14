const express = require("express");
const router = express.Router();
const Post = require("../models/post"); // your blog schema model

// DELETE /api/deleteposts/:id
router.delete("/api/deleteposts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

module.exports = router;
