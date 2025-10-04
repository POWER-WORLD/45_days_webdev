// middleware/validateProject.js
module.exports = (req, res, next) => {
  const {
    title,
    description,
    technologies,
    githubUrl,
    status,
    startDate,
    endDate,
  } = req.body;

  // Title validation
  if (!title || typeof title !== "string" || title.trim().length < 3) {
    return res.status(400).json({ message: "❌ Title is required and must be at least 3 characters" });
  }

  // Description validation
  if (!description || description.trim().length < 10) {
    return res.status(400).json({ message: "❌ Description must be at least 10 characters" });
  }

  // Technologies validation
  if (!Array.isArray(technologies) || technologies.length === 0) {
    return res.status(400).json({ message: "❌ At least one technology is required" });
  }

  // GitHub URL validation (basic check)
  if (!githubUrl || !/^https?:\/\/.+/.test(githubUrl)) {
    return res.status(400).json({ message: "❌ A valid GitHub URL is required" });
  }

  // Status validation
  const validStatuses = ["planned", "in-progress", "completed", "on-hold"];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ message: `❌ Invalid status. Must be one of: ${validStatuses.join(", ")}` });
  }

  // Dates validation (if both exist, endDate must be after startDate)
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    return res.status(400).json({ message: "❌ End date cannot be earlier than start date" });
  }

  // ✅ Passed all validations
  next();
};
