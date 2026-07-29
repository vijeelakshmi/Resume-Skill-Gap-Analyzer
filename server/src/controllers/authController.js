import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { validationResult } from 'express-validator';
import { sendEmail } from '../services/emailService.js';
import crypto from 'crypto';

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRE });
};

// @desc    Register user
export const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
export const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current user
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// @desc    Forgot password
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'No user with that email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    // Send email
    const resetUrl = `${config.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) requested a password reset. Click the link: \n\n ${resetUrl}`;

    await emailService.sendEmail({
      to: user.email,
      subject: 'Password reset token',
      text: message
    });

    res.json({ success: true, message: 'Email sent' });
  } catch (err) {
    next(err);
  }
};

// @desc    Reset password
export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ success: true, message: 'Password updated' });
  } catch (err) {
    next(err);
  }
};

// @desc    Logout user
export const logout = async (req, res, next) => {
  try {
    // In a stateless JWT setup, no server-side action is required.
    // The client should discard the token.
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};