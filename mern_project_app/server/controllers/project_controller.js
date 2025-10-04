const Project = require("../models/project_schema");

// Create new project
exports.createProject = async (req, res) => {
    try {
        const projects = new Project(req.body);
        await projects.save();
        return res.status(201).json({
            success: true,
            message: "✅ Project created successfully",
            data: projects
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "❌ Failed to create project",
            error: error.message
        });
    }
};

// Get all projects
exports.getProjects = async (req, res) => {
    try {
        const { featured, status, technology } = req.query;

        const filter = {};

        // 🎯 Filter by featured (true/false)
        if (featured === "true") filter.featured = true;
        if (featured === "false") filter.featured = false;

        // 🎯 Filter by status (completed, in-progress, planned, on-hold)
        if (status) {
            filter.status = new RegExp(status, "i"); // case-insensitive partial match
        }

        // 🎯 Filter by technology (array contains)
        if (technology) {
            filter.technologies = { $elemMatch: { $regex: technology, $options: "i" } };
        }

        const projects = await Project.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: "✅ Projects fetched successfully",
            total_data: projects.length,
            data: projects
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Failed to fetch projects",
            error: error.message
        });
    }
};

// Get single project by ID
exports.getProjectById = async (req, res) => {
    try {
        const projects = await Project.findById(req.params.id);
        if (!projects) {
            return res.status(404).json({
                success: false,
                message: "⚠️ Project not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "✅ Project fetched successfully",
            data: projects
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Failed to fetch project",
            error: error.message
        });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    try {
        const projects = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!projects) {
            return res.status(404).json({
                success: false,
                message: "⚠️ Project not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "✅ Project updated successfully",
            data: projects
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "❌ Failed to update project",
            error: error.message
        });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        const projects = await Project.findByIdAndDelete(req.params.id);
        if (!projects) {
            return res.status(404).json({
                success: false,
                message: "⚠️ Project not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "✅ Project deleted successfully",
            total_data: projects.length
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Failed to delete project",
            error: error.message
        });
    }
};