import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Anonymous'
  },
  bio: {
    type: String,
    default: 'Blog contributor'
  },
  avatar: {
    type: String,
    default: ''
  }
});

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  author: {
    type: authorSchema,
    default: () => ({})
  },
  categories: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  readTime: {
    type: Number,
    default: 1
  },
  comments: [commentSchema],
  sourceUrl: {
    type: String,
    default: ''
  },
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better search performance
blogPostSchema.index({ title: 'text', excerpt: 'text', tags: 'text' });
blogPostSchema.index({ categories: 1 });
blogPostSchema.index({ tags: 1 });
blogPostSchema.index({ featured: 1 });
blogPostSchema.index({ trending: 1 });
blogPostSchema.index({ createdAt: -1 });

export default mongoose.model('BlogPost', blogPostSchema);
