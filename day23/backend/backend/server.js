const express = require("express");
const connectToMongoDB = require("./routes/connecttodb");
const cors = require("cors");



const app = express();
app.use(express.json());
app.use(cors());
// Connect DB
connectToMongoDB();

// Routes
const postUserRoute = require("./routes/postuser");
const getUserRoute = require("./routes/getuser");

app.use("/api/users", getUserRoute);
app.use("/api/users", postUserRoute);

const PORT =5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app; // export for testing
