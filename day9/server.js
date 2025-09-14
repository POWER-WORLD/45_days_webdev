// server.js - MongoDB Connection Challenge
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const PORT = 3000;

// Database name
const dbName = 'resumeData';
let db;

// 🔑 Build the MongoDB URI safely
// (encode password to avoid issues with @, #, :, etc.)
const username = 'your user name';
const password = encodeURIComponent('your pass'); // IMPORTANT
const cluster = 'your cluster name';
const mongoUrl = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Async function to handle MongoDB connection
async function connectToMongoDB() {
  const client = new MongoClient(mongoUrl, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected successfully to MongoDB Atlas');

    // Get database reference
    db = client.db(dbName);
    console.log(`📊 Using database: ${dbName}`);

    // Test the connection with a ping
    await db.command({ ping: 1 });
    console.log('🏓 Database ping successful');

    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
}

// Middleware
app.use(express.json());

// Basic API route to test database connection
app.get('/api/status', (req, res) => {
  res.json({
    message: 'MongoDB connection successful!',
    database: dbName,
    status: db ? 'connected' : 'not connected',
    timestamp: new Date().toISOString(),
  });
});

// Start server after connecting to MongoDB
connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 Test your connection: http://localhost:${PORT}/api/status`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  });
