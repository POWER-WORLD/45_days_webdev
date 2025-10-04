const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project_controller");
const validateProject = require("../middlewares/validate_project");

// CRUD routes
router.post("/", validateProject, projectController.createProject);
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);
router.put("/:id",validateProject, projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;