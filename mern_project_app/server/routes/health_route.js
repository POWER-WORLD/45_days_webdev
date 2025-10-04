const express = require("express");
const router = express.Router();
const os = require("os");

// GET /api/health
router.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Day 31 MERN Stack API Server is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    uptime: process.uptime() // in seconds
  });
});

module.exports = router;