const express = require("express");
const router = express.Router();
const WorkExperience = require("../models/work-experience");

// Route: GET filter data by company, industry, location, technologies, search
router.get("/", async (req, res) => {
  try {
    const { company, industry, location, technologies, search, isCurrent } = req.query; // ✅ added search
    let filter = {};

    if (company) {
      filter.company = { $regex: company, $options: "i" };
    }
    if (industry) {
      filter.industry = { $regex: industry, $options: "i" };
    }
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    if (technologies) {
      filter.technologies = { $regex: technologies, $options: "i" };
    }
    if (isCurrent) {
      filter.isCurrent = { $regex: isCurrent, $options: "i" };
    }
    if (search) {
      filter.$or = [
        { company: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } }, // ✅ added position
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const workExperiences = await WorkExperience.find(filter);
    res.json({
      success: true,
      total: workExperiences.length,
      data: workExperiences
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
