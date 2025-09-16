const mongoose = require("mongoose");
const app = require("./app");

const PORT = 3000;
// MongoDB Atlas credentials
const username = "";
const password = encodeURIComponent(""); // encode password
const cluster = "";
const MONGO_URI = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Connect DB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ DB connection error:", err.message);
  });
