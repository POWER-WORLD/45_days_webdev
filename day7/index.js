const express = require('express');
const app = express();
// Middleware for parsing JSON (if needed later)
app.use(express.json());
// Define the /api route
app.get('/api', (req, res) => {
res.json({ message: 'API is running!' });
});
// Add a root route for testing
app.get('/', (req, res) => {
res.send('Hello from Express!Visit /api for JSON response');
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}`);
});