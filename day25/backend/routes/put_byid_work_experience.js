const express = require("express");
const router = express.Router();
const ExperienceModel = require("../models/work-experience")

//route for updating work experience by id
router.put("/:id", async (req, res) => {
    try {
        const experience = await ExperienceModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Work experience not found"
            });
        }
        res.json({
            success: true,
            message: "Work experience updated successfully",
            data: experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});
module.exports = router;