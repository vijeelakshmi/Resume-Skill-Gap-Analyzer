import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  jobDescription: { type: String, required: true },
  jobTitle: String,
  experienceLevel: String,
  userSkills: [String],
  requiredSkills: [String],
  matchedSkills: [String],
  gapSkills: [String],
  matchPercentage: Number,
  result: mongoose.Schema.Types.Mixed, // full detailed result
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Analysis', analysisSchema);