const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

module.exports = app; // ✅ only export app, no listen()
