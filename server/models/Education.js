// backend/models/Education.js
import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  title: String,
  institution: String,
  period: String,
  description: String,
  color: String
});

export default mongoose.model('Education', educationSchema);
