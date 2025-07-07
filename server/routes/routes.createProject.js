import express from "express"
import mongoose from "mongoose"
export const createProjectRouter = express.Router();

// Project Schema
export const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  repo: {
    type: String,
    trim: true,
    default: ''
  },
  link: {
    type: String,
    trim: true,
    default: ''
  },
  image: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Project model
export const Project = mongoose.model('Project', projectSchema);

// POST /api/createProject
createProjectRouter.post('/', async (req, res) => {
  try {
    const { title, description, category, tags, repo, link, image } = req.body;

    // Basic validation
    if (!title || !description || !category) {
      return res.status(400).json({
        error: 'Title, description, and category are required'
      });
    }

    // Create new project
    const project = new Project({
      title,
      description,
      category,
      tags: tags || [],
      repo: repo || '',
      link: link || '',
      image: image || ''
    });

    // Save to MongoDB
    const savedProject = await project.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project: savedProject
    });

  } catch (error) {
    console.error('Error creating project:', error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        details: error.message
      });
    }
    
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

