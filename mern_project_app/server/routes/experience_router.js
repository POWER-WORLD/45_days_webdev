const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experience_controller");
const validateExperience = require("../middlewares/validate_experience");

// Routes
router.post("/", validateExperience, experienceController.createExperience);
router.get("/", experienceController.getExperiences);
router.get("/:id", experienceController.getExperienceById);
router.put("/:id", validateExperience, experienceController.updateExperience);
router.delete("/:id", experienceController.deleteExperience);

module.exports = router;

