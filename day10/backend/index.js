// server.js - Full CRUD API with MongoDB Atlas
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const path = require("path");

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
const dbName = "resumeData";

const mongoUrl = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let db, projectsCollection;

// 🔹 Connect to MongoDB with TLS
async function connectToMongoDB() {
  const client = new MongoClient(mongoUrl, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    tls: true,
  });

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    db = client.db(dbName);
    projectsCollection = db.collection("projects");
    console.log(`📊 Using database: ${dbName}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
}

// 🔹 Routes

// GET all projects (Read)
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await projectsCollection.find().toArray();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// POST a new project (Create)
app.post("/api/projects", async (req, res) => {
  try {
    const newProject = req.body;
    const result = await projectsCollection.insertOne(newProject);

    res.status(201).json({
      message: "✅ Project added successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add project" });
  }
});

// PUT update a project by ID (Update)
app.put("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = req.body;

    const result = await projectsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedProject }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "✅ Project updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update project" });
  }
});

// DELETE a project by ID (Delete)
app.delete("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await projectsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "🗑️ Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// 🔹 Start server after DB connection
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📡 Try GET http://localhost:${PORT}/api/projects`);
    console.log(`📡 Try POST http://localhost:${PORT}/api/projects`);
    console.log(`📡 Try PUT http://localhost:${PORT}/api/projects/:id`);
    console.log(`📡 Try DELETE http://localhost:${PORT}/api/projects/:id`);
  });
});
