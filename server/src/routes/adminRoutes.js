import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/stats', adminController.getStats);
// ... other admin routes

export default router;