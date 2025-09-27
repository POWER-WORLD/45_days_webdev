// db.js
const mongoose = require("mongoose");
const { mongo_url, db_name } = require("./config"); // same as before

// Connect to MongoDB with Mongoose
async function connectToMongoDB() {
  try {
    await mongoose.connect(mongo_url, {
      dbName: db_name,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ Connected to MongoDB with Mongoose (DB: ${db_name})`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // stop app if DB connection fails
  }
}

module.exports = connectToMongoDB;
