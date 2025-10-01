const express = require("express");
const router = express.Router();
const ExperienceModel = require("../models/work-experience");

// Route to delete experience by id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if id is a valid MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                error: "Invalid experience ID format"
            });
        }

        // Find and delete the experience
        const deletedExperience = await ExperienceModel.findByIdAndDelete(id);

        if (!deletedExperience) {
            return res.status(404).json({
                success: false,
                error: "Experience not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Experience deleted successfully",
            data: deletedExperience
        });
        
    } catch (error) {
        console.error("Error deleting experience:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
            message: error.message
        });
    }
});

module.exports = router;