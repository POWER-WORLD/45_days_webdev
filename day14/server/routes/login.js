// login.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// Mongoose model
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../../config/config");
// POST /login
router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Create JWT
    const token = jwt.sign({ userId: user._id }, jwt_secret, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", errorDetails: error.message });
  }
});

module.exports = router;
