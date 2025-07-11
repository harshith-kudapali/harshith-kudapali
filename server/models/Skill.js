import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: String,
  level: Number,
  color: String,
  category: String // 'programming', 'web', 'other'
});

export default mongoose.model('Skill', skillSchema);
