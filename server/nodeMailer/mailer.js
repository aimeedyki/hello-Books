import nodemailer from 'nodemailer';

require('dotenv').config();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

export const mailOptions = (to, bcc, subject, html) => ({
  from: process.env.EMAIL,
  to,
  subject,
  html
});
