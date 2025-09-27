const express = require("express");
const router = express.Router();
const ExperienceModel = require("../models/work-experience")

//route for posting work experience
router.post("/", async (req, res) => {
    try {
        const experience = new ExperienceModel(req.body);
        await experience.save();
        res.status(201).send({
            success: true,
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
