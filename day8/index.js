// resumeApi.js - REST API Challenge
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// 🔹 Hard-coded data
const projects = [
  { id: 1, name: "Portfolio Website", tech: ["HTML", "CSS", "JavaScript"], year: 2024 },
  { id: 2, name: "E-commerce Store", tech: ["React", "Node.js", "MongoDB"], year: 2025 },
  { id: 3, name: "AI Chatbot", tech: ["Python", "TensorFlow"], year: 2025 }
];

const experience = [
  { id: 1, company: "Agratas Edutech", role: "AI/ML Intern", year: 2024 },
  { id: 2, company: "Future Company", role: "Full Stack Developer", year: 2026 }
];

// 🔹 Routes

app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');
});

// Get all projects
app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// Get a single project by ID
app.get("/api/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id); // convert string → number
  const project = projects.find(p => p.id === projectId);

  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: "Project not found" });
  }
});

// Get all experience
app.get("/api/experience", (req, res) => {
  res.json(experience);
});

// 🔹 Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Try: http://localhost:${PORT}/api/projects`);
  console.log(`📡 Try: http://localhost:${PORT}/api/projects/1`);
  console.log(`📡 Try: http://localhost:${PORT}/api/experience`);
});
