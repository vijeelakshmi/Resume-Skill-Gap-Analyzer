import Resume from '../models/Resume.js';
import { parseResume } from '../services/resumeParserService.js';
import { extract as extractSkills } from '../services/skillExtractorService.js';
import fs from 'fs';

// @desc    Upload resume
export const uploadResume = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }

  try {
    //  Step 1: Parse resume text
    const text = await parseResume(req.file.path, req.file.mimetype);

    //  Step 2: Extract skills
    const skills = extractSkills(text);

    //  Step 3: Save to DB
    const resume = await Resume.create({
      user: req.user?.id, // safer access
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      text,
      skills,
      parsedAt: new Date()
    });

    res.status(201).json({
      success: true,
      resume: {
        id: resume._id,
        originalName: resume.originalName,
        skills: resume.skills,
        parsedAt: resume.parsedAt
      }
    });

  } catch (err) {
    console.error("Upload Error:", err);

    //  Cleanup uploaded file if parsing fails
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, () => {});
    }

    next(err);
  }
};

// @desc    Get user's resumes
export const getUserResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user.id })
      .select('originalName skills parsedAt')
      .sort('-parsedAt');

    res.json({
      success: true,
      count: resumes.length,
      resumes
    });

  } catch (err) {
    console.error("Fetch Error:", err);
    next(err);
  }
};

// @desc    Delete resume
export const deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    //  Delete file safely
    if (resume.path && fs.existsSync(resume.path)) {
      fs.unlink(resume.path, (err) => {
        if (err) console.error('File delete error:', err);
      });
    }

    res.json({
      success: true,
      message: 'Resume deleted'
    });

  } catch (err) {
    console.error("Delete Error:", err);
    next(err);
  }
};