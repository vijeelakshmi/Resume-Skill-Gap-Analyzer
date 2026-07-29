import Recommendation from '../models/Recommendation.js';
import * as recommendationEngine from '../services/recommendationEngine.js';
// or import { generate } from '../services/recommendationEngine.js' if generate is exported as named.

export const generateRecommendations = async (req, res, next) => {
  try {
    const { analysisId } = req.params;
    const recommendations = await recommendationEngine.generate(analysisId, req.user.id);
    res.json({ success: true, recommendations });
  } catch (err) {
    next(err);
  }
};

export const getUserRecommendations = async (req, res, next) => {
  try {
    const recs = await Recommendation.find({ user: req.user.id }).populate('analysis', 'jobTitle');
    res.json({ success: true, recommendations: recs });
  } catch (err) {
    next(err);
  }
};