import { Schema, model } from 'mongoose';

const newsletterSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default model('Newsletter', newsletterSchema);
