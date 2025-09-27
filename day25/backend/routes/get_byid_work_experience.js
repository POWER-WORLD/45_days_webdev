const express = require("express");
const router = express.Router();
const ExperienceModel = require("../models/work-experience")

//route for getting work experience by id
router.get("/:id", async (req, res) => {
    try {
        const experience = await ExperienceModel.findById(req.params.id);
        if (!experience) {
            return res.status(404).send({
                success: false,
                message: "Work experience not found"
            });
        }
        res.status(200).send({
            success: true,
            data: experience
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        });
    }
});

module.exports = router;