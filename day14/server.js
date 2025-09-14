const express = require("express");
const { mongo_port } = require("./config/config");
const { connectToMongoDB } = require("./config/db");
const path = require("path");

// Initialize Express app and middleware
const port = mongo_port || 5000;
const app = express();
app.use(express.json());

// connect to MongoDB
connectToMongoDB();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));
// Serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Signup route
const signupRoute = require("./server/routes/signup");
app.use(signupRoute);

// Login route
const loginRoute = require("./server/routes/login");
app.use(loginRoute);

// Post route
const postRoute = require("./server/routes/post");
app.use(postRoute);

// Delete post route
const deletePostRoute = require("./server/routes/deletepost");
app.use(deletePostRoute);

// Comment on post route
const commentPostRoute = require("./server/routes/commentpost");
app.use(commentPostRoute);

// Reply of comments
const replyRoute = require("./server/routes/reply");
app.use(replyRoute);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`🚀 Signup endpoint at http://localhost:${port}/api/signup`);
  console.log(`🚀 Login endpoint at http://localhost:${port}/api/login`);
  console.log(`🚀 Post endpoint at http://localhost:${port}/api/posts`);
  console.log(`🚀 Delete Post endpoint at http://localhost:${port}/api/deleteposts/:id`);
  console.log(`🚀 Comment on Post endpoint at http://localhost:${port}/api/posts/:postId/comments`);
  console.log(`🚀 Comment on Post endpoint at http://localhost:${port}/api/posts/:postId/comments/:commentId/replies`)
});
