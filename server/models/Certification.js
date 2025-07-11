// backend/models/Certification.js
import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  title: String,
  institution: String,
  period: String,
  description: String,
  color: String
});

export default mongoose.model('Certification', certificationSchema);

