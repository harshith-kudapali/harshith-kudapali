// backend/controllers/certifications.controller.js
import Certification from '../models/Certification.js';

export const getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find();
    res.json(certifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const createCertification = async (req, res) => {
  try {
    const newCert = new Certification(req.body);
    await newCert.save();
    res.status(201).json(newCert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};