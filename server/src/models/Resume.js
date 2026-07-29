import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: String,
  originalName: String,
  mimeType: String,
  size: Number,
  path: String,
  text: String,
  skills: [String],
  parsedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Resume', resumeSchema);