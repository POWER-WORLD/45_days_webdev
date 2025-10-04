const express = require("express");
const router = express.Router();
const statsController = require("../controllers/stats_controller");

// GET /api/stats
router.get("/", statsController.getStats);

module.exports = router;
