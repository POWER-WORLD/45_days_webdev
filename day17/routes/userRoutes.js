const express = require("express");
const User = require("../models/user");
const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// POST create user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
