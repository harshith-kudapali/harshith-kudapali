// models/Resume.js
import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String },
  annotations: { type: Object, default: {} },
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);
