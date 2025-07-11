// backend/controllers/skills.controller.js
import Skill from '../models/Skill.js';

export const getProgrammingSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ category: 'programming' });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWebSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ category: 'web' });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOtherSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ category: 'other' });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createSkill = async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};