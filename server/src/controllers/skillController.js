import Skill from '../models/Skill.js';
import { SKILLS } from '../services/skillExtractorService.js';

// @desc    Get all skills (for frontend autocomplete)
export const getSkills = async (req, res, next) => {
  try {
    // For simplicity, return the static list (or fetch from DB)
    res.json({ success: true, skills: SKILLS });
  } catch (err) {
    next(err);
  }
};

// @desc    Add a new skill (admin only)
export const addSkill = async (req, res, next) => {
  // Implementation for admin
};