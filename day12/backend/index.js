//index.js - Full CRUD API with MongoDB Atlas
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
const dbName = "blogsdata";

const mongoUrl = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let db, blogsCollection;
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
        console.log("Connected to MongoDB Atlas");
        db = client.db(dbName);
        blogsCollection = db.collection("blogs");
        console.log(`Connected to MongoDB using database:${dbName}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

// 🔹 Routes

// POST a new blog (Create)
app.post("/api/blogs", async (req, res) => {
    try {
        const newBlog = {...req.body,createdAt: new Date(),updatedAt: new Date()};
        const result = await blogsCollection.insertOne(newBlog);
        res.json({ insertedId: result.insertedId , message: "Blog added successfully" });
    } catch (error) {
        console.error("Failed to add blog:", error.message);
        res.status(500).json({ error: "Failed to add blog" });
    }
});

// GET all blogs (Read)
app.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await blogsCollection.find().toArray();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
});

// GET blogs by date (Read)
app.get("/api/blogs/date/:date", async (req, res) => {
    try {
        const date = req.params.date; // e.g. "2025-08-18"
        const blogs = await blogsCollection.find({ createdAt: date }).toArray();
        res.json(blogs);
    } catch (error) {
        console.error("Error fetching blogs by date:", error.message);
        res.status(500).json({ error: "Failed to fetch blogs by date" });
    }
});


// PUT update a blog by ID (Update)
app.put("/api/blogs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBlog = {...req.body,updatedAt: new Date()};

        const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };

        const result = await blogsCollection.updateOne(filter,{ $set: updatedBlog });

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.json({ message: "Blog updated successfully" });
    } catch (error) {
        console.error("Failed to update blog:", error.message);
        res.status(500).json({ error: "Failed to update blog" });
    }
});

// DELETE a blog by ID (Delete)
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await blogsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});



// start the server after connecting to MongoDB
connectToMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Try GET http://localhost:${PORT}/api/blogs`);
        console.log(`Try POST http://localhost:${PORT}/api/blogs`);
        console.log(`Try GET http://localhost:${PORT}/api/blogs/date/:date`);
        console.log(`Try PUT http://localhost:${PORT}/api/blogs/:id`);
        console.log(`Try DELETE http://localhost:${PORT}/api/blogs/:id`);
    });
});
