import express from 'express';
import { protect } from '../middleware/auth.js';
import * as analysisController from '../controllers/analysisController.js';

const router = express.Router();

router.use(protect);

router.post('/from-resume', analysisController.analyzeFromResume);
router.post('/manual', analysisController.analyzeManual);
router.get('/', analysisController.getUserAnalyses);
router.get('/:id', analysisController.getAnalysisById);

export default router;