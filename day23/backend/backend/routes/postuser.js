const express = require("express");
const router = express.Router();
const User = require("../model/user");

// Create User
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: errors.join(", ") });
    }
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
