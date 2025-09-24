const mongoose = require("mongoose");

// MongoDB Atlas credentials
const username = "";
const password = encodeURIComponent("");
const cluster = "";
const MONGO_URI = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// connect to mongoose using mongoose
let db , testcollection;                 
async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
    db = mongoose.connection;
    testcollection = db.collection("user_data");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

module.exports = connectToMongoDB;