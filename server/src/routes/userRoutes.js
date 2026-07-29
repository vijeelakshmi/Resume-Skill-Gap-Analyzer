import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
  getUserById
} from '../controllers/userController.js';

const router = express.Router();

// All user routes require authentication
router.use(protect);

// Profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// Admin only routes
router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', authorize('admin'), getUserById);
router.delete('/:id', deleteUser); // Ownership check inside controller

export default router;