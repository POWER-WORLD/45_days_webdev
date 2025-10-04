const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    proficiency: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner",
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
      default: 0,
    },
    description: {
      type: String,
    },
    icon: {
      type: String, // e.g., FontAwesome or custom icon class
    },
    color: {
      type: String, // e.g., HEX code (#61dafb)
      match: /^#([0-9A-F]{3}){1,2}$/i, // validate hex color
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
