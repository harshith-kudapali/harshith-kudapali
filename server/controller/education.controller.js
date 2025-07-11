// backend/controllers/education.controller.js
import Education from '../models/Education.js';

export const getEducation = async (req, res) => {
  try {
    const education = await Education.find();
    res.json(education);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createEducation = async (req, res) => {
  try {
    const newEdu = new Education(req.body);
    await newEdu.save();
    res.status(201).json(newEdu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
