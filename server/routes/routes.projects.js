// routes.projects.js
import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { Project } from './routes.createProject.js';

export const projectsRouter = Router();

// GET all projects
projectsRouter.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// POST a new project
projectsRouter.post('/', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Bad request: ' + err.message });
  }
});
