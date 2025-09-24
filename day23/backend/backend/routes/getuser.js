const express = require("express");
const router = express.Router();
const User = require("../model/user");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
});

module.exports = router;
