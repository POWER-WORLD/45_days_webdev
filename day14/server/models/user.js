// user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6
    // we’ll hash it later with bcrypt
  },
  firstName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  avatar: {
    type: String, // URL to profile picture
    default: "https://default-avatar.png"
  },
  role: {
    type: String,
    enum: ["user", "admin"], // only allowed values
    default: "user"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: null
  },
  profile: {
    bio: { type: String, maxlength: 200 },
    website: { type: String, trim: true },
    socialLinks: {
      facebook: { type: String, trim: true },
      twitter: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true }
    }
  }
}, {
  timestamps: true // adds createdAt & updatedAt automatically
});

// Create model(this line defines the collection name as 'users')
const user = mongoose.model("UserInformation", userSchema);

module.exports = user;