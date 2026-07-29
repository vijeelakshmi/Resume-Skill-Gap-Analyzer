import nodemailer from 'nodemailer';
import config from '../config/index.js';

const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  secure: false, // true for 465
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  }
});

export const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `"Skill Gap Analyzer" <${config.EMAIL_USER}>`,
    to,
    subject,
    text,
    html
  };

  return transporter.sendMail(mailOptions);
};