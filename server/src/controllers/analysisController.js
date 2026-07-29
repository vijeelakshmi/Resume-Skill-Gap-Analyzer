import Analysis from '../models/Analysis.js';
import Resume from '../models/Resume.js';
import { extract as extractSkills } from '../services/skillExtractorService.js';
import * as analysisService from '../services/analysisService.js';

// @desc    Perform analysis from uploaded resume + job description
export const analyzeFromResume = async (req, res, next) => {
  try {
    const { resumeId, jobDescription, jobTitle, experienceLevel } = req.body;
    if (!resumeId || !jobDescription) {
      return res.status(400).json({ message: 'Resume ID and job description are required' });
    }

    // Get resume
    const resume = await Resume.findOne({ _id: resumeId, user: req.user.id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Extract required skills from job description
    const requiredSkills = extractSkills(jobDescription);

    // Perform analysis
    const result = analysisService.analyze(resume.skills, requiredSkills);

    // Save analysis
    const analysis = await Analysis.create({
      user: req.user.id,
      resume: resumeId,
      jobDescription,
      jobTitle,
      experienceLevel,
      userSkills: resume.skills,
      requiredSkills,
      matchedSkills: result.matched,
      gapSkills: result.gaps,
      matchPercentage: result.matchPercentage,
      result
    });

    res.json({ success: true, analysis: result, id: analysis._id });
  } catch (err) {
    next(err);
  }
};

// @desc    Perform analysis from manual skills input
export const analyzeManual = async (req, res, next) => {
  try {
    const { userSkills, requiredSkills, jobTitle, experienceLevel } = req.body;
    if (!userSkills || !requiredSkills) {
      return res.status(400).json({ message: 'Both skill lists are required' });
    }

    const userSkillsArray = userSkills.split(',').map(s => s.trim()).filter(Boolean);
    const requiredSkillsArray = requiredSkills.split(',').map(s => s.trim()).filter(Boolean);

    const result = analysisService.analyze(userSkillsArray, requiredSkillsArray);

    // Save analysis
    const analysis = await Analysis.create({
      user: req.user.id,
      jobDescription: requiredSkillsArray.join(', '),
      jobTitle,
      experienceLevel,
      userSkills: userSkillsArray,
      requiredSkills: requiredSkillsArray,
      matchedSkills: result.matched,
      gapSkills: result.gaps,
      matchPercentage: result.matchPercentage,
      result
    });

    res.json({ success: true, analysis: result, id: analysis._id });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all analyses for current user
export const getUserAnalyses = async (req, res, next) => {
  try {
    const analyses = await Analysis.find({ user: req.user.id })
      .populate('resume', 'originalName')
      .sort('-createdAt')
      .select('jobTitle matchPercentage createdAt');
    res.json({ success: true, analyses });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single analysis by ID
export const getAnalysisById = async (req, res, next) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('resume', 'originalName');
    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    res.json({ success: true, analysis });
  } catch (err) {
    next(err);
  }
};