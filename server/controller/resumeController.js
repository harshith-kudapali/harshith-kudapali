// controllers/resumeController.js
import Resume from '../models/Resume.js';

export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
};

export const addResume = async (req, res) => {
  try {
    const { name, url, thumbnail } = req.body;
    if (!name || !url) return res.status(400).json({ error: "Name and URL are required" });

    const newResume = new Resume({ name, url, thumbnail });
    await newResume.save();
    res.status(201).json(newResume);
  } catch (err) {
    res.status(400).json({ error: "Failed to add resume" });
  }
};


export const saveAnnotations = async (req, res) => {
  try {
    const { id } = req.params;
    const { annotations } = req.body;
    const updated = await Resume.findByIdAndUpdate(id, { annotations }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save annotations' });
  }
};
