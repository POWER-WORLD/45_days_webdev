//schema for work experience
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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null, // null if ongoing
    },
    location: {
      type: String,
      trim: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
    achievements: {
      type: [String], // array of strings
      default: [],
    },
    technologies: {
      type: [String], // array of strings
      default: [],
    },
    companySize: {
      type: Number, // e.g. 100000
    },
    industry: {
      type: String,
    },
    website: {
      type: String,
      match: /^https?:\/\/.+/, // must be a valid URL
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

module.exports = mongoose.model("Experience", experienceSchema);
