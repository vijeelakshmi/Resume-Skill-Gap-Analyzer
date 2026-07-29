import User from '../models/User.js';
import Analysis from '../models/Analysis.js';

export const getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAnalyses = await Analysis.countDocuments();
    const recentAnalyses = await Analysis.find().sort('-createdAt').limit(10).populate('user', 'name email');
    res.json({ success: true, stats: { totalUsers, totalAnalyses, recentAnalyses } });
  } catch (err) {
    next(err);
  }
};