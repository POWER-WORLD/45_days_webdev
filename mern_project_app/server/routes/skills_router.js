const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skill_controller");
const validateSkill = require("../middlewares/validate_skill");

// Routes
router.post("/", validateSkill, skillController.createSkill);
router.get("/", skillController.getSkills);
router.get("/:id", skillController.getSkillById);
router.put("/:id", validateSkill, skillController.updateSkill);
router.delete("/:id", skillController.deleteSkill);

module.exports = router;
