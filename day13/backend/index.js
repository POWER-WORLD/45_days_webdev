//Today we'll build a complete Work Experience API with Node.js & MongoDB. Master CRUD operations,using schema, validation, and professional error handling.
//index.js - Full CRUD API with MongoDB Atlas

const express = require("express");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const path = require("path");

// Import WorkExperience model
const WorkExperience = require("./models/workexperience");


const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend")));


// MongoDB Atlas credentials
const username = "pk0403564_db_user";
const password = encodeURIComponent("HgdjVpCkGpmTyBUv"); // encode password
const cluster = "cluster0.yj2ooko";
const dbName = "workexperience";

const mongoUrl = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


let db, experiencesCollection;
// 🔹 Connect to MongoDB with TLS
async function connectToMongoDB() {
    try {
        const client = new MongoClient(mongoUrl, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        await client.connect();
        db = client.db(dbName);
        experiencesCollection = db.collection("experiences");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

// 🔹 Routes

// POST a new experience (Create)
app.post("/api/experiences", async (req, res) => {
    try {
        const newExperience = new WorkExperience(req.body);
        await newExperience.validate(); // Validate data against schema
        const result = await experiencesCollection.insertOne({...newExperience.toObject()});
        res.json({result, message: "Work experience added successfully" });
    } catch (error) {
        console.error("Failed to add work experience:", error.message);
        res.status(400).json({ error: error.message });
    }
});

// GET all experiences (Read)








//start server and connect to DB
app.listen(PORT, async () => {
    await connectToMongoDB();
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Try POST http://localhost:${PORT}/api/experiences`);
});