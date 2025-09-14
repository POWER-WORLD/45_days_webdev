const slugify = require("slugify");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    unique: true, // enforce unique slugs
    trim: true
  },
  content: {
    type: String,
    required: [true, "Content is required"]
  },
  excerpt: {
    type: String,
    trim: true,
    maxlength: 300
  },
  author: {
    type: String,
    ref: "User",
    required: true
  },
  category: {
    type: String,
    trim: true
  },
  tags: [
    {
      type: String,
      trim: true
    }
  ],
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft"
  },
  featuredImage: {
    type: String,
    trim: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// middleware to generate slug before saving
blogSchema.pre("save", function(next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Post = mongoose.model("UserPost", blogSchema);
module.exports = Post;
