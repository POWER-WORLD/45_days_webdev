// signup.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// Mongoose model
const User = require("../models/user"); 

// POST /signup
router.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", errorDetails: error.message });
  }
});

module.exports = router;
