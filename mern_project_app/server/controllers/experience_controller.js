const Experience = require("../models/experience_schema");

// ➕ Create new experience
exports.createExperience = async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        return res.status(201).json({
            success: true,
            message: "✅ Experience created successfully",
            data: experience
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "❌ Failed to create experience",
            error: error.message
        });
    }
};

// 📋 Get all experiences
exports.getExperiences = async (req, res) => {
    try {
        const { isCurrent } = req.query;

        const filter = {};

        // 🎯 Filter by current/past experiences
        if (isCurrent === "true") {
            filter.endDate = null; // current jobs
        } else if (isCurrent === "false") {
            filter.endDate = { $ne: null }; // past jobs
        }

        const experiences = await Experience.find(filter).sort({ startDate: -1 });
        return res.status(200).json({
            success: true,
            message: "✅ Experiences fetched successfully",
            total_data: experiences.length,
            data: experiences
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Failed to fetch experiences",
            error: error.message
        });
    }
};

// 🔍 Get single experience by ID
exports.getExperienceById = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "⚠️ Experience not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "✅ Experience fetched successfully",
            data: experience
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Failed to fetch experience",
            error: error.message
        });
    }
};

// ✏️ Update experience
exports.updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "⚠️ Experience not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "✅ Experience updated successfully",
            data: experience
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "❌ Failed to update experience",
            error: error.message
        });
    }
};

// 🗑️ Delete experience
exports.deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "⚠️ Experience not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "✅ Experience deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Failed to delete experience",
            error: error.message
        });
    }
};