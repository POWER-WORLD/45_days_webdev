const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: [true, "Comment content is required"],
    trim: true,
    maxlength: 1000
  },
  likes: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
});

// Create model
const CommentS = mongoose.model("CommentS", commentSchema);

module.exports = CommentS;
