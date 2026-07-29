import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  name: String,
  url: String,
  type: String
});

const recommendationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  analysis: { type: mongoose.Schema.Types.ObjectId, ref: 'Analysis' },
  skill: { type: String, required: true },
  title: String,
  description: String,
  resources: [resourceSchema],   // ✅ now an array of objects
  priority: Number,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Recommendation', recommendationSchema);