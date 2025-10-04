const Skill = require("../models/skill_schema");

// ➕ Create a new skill
exports.createSkill = async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        return res.status(201).json({
            success: true,
            message: "✅ Skill created successfully",
            data: skill
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "❌ Failed to create skill",
            error: error.message
        });
    }
};

// 📋 Get all skills
exports.getSkills = async (req, res) => {
    try {
        const { category, proficiency, minYears, maxYears } = req.query;

        const filter = {};

        // 🎯 Exact or partial match for category
        if (category) {
            filter.category = new RegExp(category, "i");
        }

        // 🎯 Exact match for proficiency
        if (proficiency) {
            filter.proficiency = new RegExp(proficiency, "i");
        }

        // 🎯 Range filtering for yearsOfExperience
        if (minYears || maxYears) {
            filter.yearsOfExperience = {};
            if (minYears) filter.yearsOfExperience.$gte = parseInt(minYears);
            if (maxYears) filter.yearsOfExperience.$lte = parseInt(maxYears);
        }

        // 📦 Fetch filtered skills
        const skills = await Skill.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success:true,
            total_data:skills.length,
            data:skills
        });
    } catch (err) {
        res.status(500).json({ 
            success:false,
            message: "❌ Failed to fetch skill",
            error: err.message });
    }
};

// 🔍 Get single skill by ID
exports.getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "⚠️ Skill not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "✅ Skill fetched successfully",
            data: skill
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Failed to fetch skill",
            error: error.message
        });
    }
};

// ✏️ Update skill
exports.updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "⚠️ Skill not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "✅ Skill updated successfully",
            data: skill
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "❌ Failed to update skill",
            error: error.message
        });
    }
};

// 🗑️ Delete skill
exports.deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "⚠️ Skill not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "✅ Skill deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "❌ Failed to delete skill",
            error: error.message
        });
    }
};