const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null, // null means currently working
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
    achievements: [
      {
        type: String,
      },
    ],
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Freelance"],
      default: "Full-time",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);
