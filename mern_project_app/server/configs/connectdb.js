const mongoose = require("mongoose");

async function connectToMongoDB(mongo_url, db_name) {
    
    if (!mongo_url || !db_name) {
        throw new Error("MongoDB URL and database name are required");
    }

    try {
        await mongoose.connect(mongo_url, {dbName: db_name});
        console.log(`✅ Connected to MongoDB with Mongoose (DB: ${db_name})`);

    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        throw error; // Re-throw the error for proper error handling upstream
    }
}

module.exports = connectToMongoDB;