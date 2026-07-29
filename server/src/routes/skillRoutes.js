import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import * as skillController from '../controllers/skillController.js';

const router = express.Router();

router.get('/', skillController.getSkills);
router.post('/', protect, authorize('admin'), skillController.addSkill);

export default router;