import express from 'express';
import { protect } from '../middleware/auth.js';
import { generateRecommendations, getUserRecommendations } from '../controllers/recommendationController.js';

const router = express.Router();

router.use(protect);
router.post('/generate/:analysisId', generateRecommendations);
router.get('/', getUserRecommendations);

export default router;