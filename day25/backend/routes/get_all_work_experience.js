const express = require("express");
const router = express.Router();
const ExperienceModel = require("../models/work-experience")

//route for getting all work experience
router.get("/", async (req, res) => {
    try {
        const experience = await ExperienceModel.find();
        res.status(200).send({
            success: true,
            total: experience.length,
            company: experience.company,
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