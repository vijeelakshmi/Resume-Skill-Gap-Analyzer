import express from 'express';
import { protect } from '../middleware/auth.js';
import * as resumeController from '../controllers/resumeController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

//  All routes require authentication
router.use(protect);

//  Upload Resume
router.post(
  '/upload',
  upload.single('resume'),
  resumeController.uploadResume
);

//  Get all resumes for logged-in user
router.get(
  '/',
  resumeController.getUserResumes
);

//  Delete resume
router.delete(
  '/:id',
  resumeController.deleteResume
);

export default router;