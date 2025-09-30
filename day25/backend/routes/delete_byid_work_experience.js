const express = require("express");
const router = express.Router();


//route to delete experience by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Simulate deletion logic
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.json({ message: "Experience deleted successfully" });
    
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ error: "Failed to delete experience" });
  }
});
module.exports = router;