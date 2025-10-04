const Project = require("../models/project_schema");
const Experience = require("../models/experience_schema");
const Skill = require("../models/skill_schema");

exports.getStats = async (req, res) => {
  try {
    // 📝 Projects stats
    const projectsTotal = await Project.countDocuments();
    const projectsFeatured = await Project.countDocuments({ featured: true });
    const projectsCompleted = await Project.countDocuments({ status: "completed" });

    // 📝 Experiences stats
    const experiencesTotal = await Experience.countDocuments();
    const experiencesCurrent = await Experience.countDocuments({ endDate: null });

    // 📝 Skills stats
    const skillsTotal = await Skill.countDocuments();
    const skillsExpert = await Skill.countDocuments({ proficiency: "Expert" });
    const skillsAdvanced = await Skill.countDocuments({ proficiency: "Advanced" });

    res.json({
      success: true,
      data: {
        projects: {
          total: projectsTotal,
          featured: projectsFeatured,
          completed: projectsCompleted
        },
        experiences: {
          total: experiencesTotal,
          current: experiencesCurrent
        },
        skills: {
          total: skillsTotal,
          expert: skillsExpert,
          advanced: skillsAdvanced
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
