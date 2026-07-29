import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String },
  aliases: [String],
  popularity: Number,
  description: String,
  resources: [{ type: String }] // URLs
});

export default mongoose.model('Skill', skillSchema);