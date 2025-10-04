const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required:true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: [
      {
        type: String,
        required: true,
      },
    ],
    githubUrl: {
      type: String,
      required: true,
    },
    liveUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["planned", "in-progress", "completed", "on-hold"],
      default: "planned",
    },
  },
  {
    timestamps: true, // automatically creates createdAt & updatedAt
  }
);

module.exports = mongoose.model("Project", projectSchema);
