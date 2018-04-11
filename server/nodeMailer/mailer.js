import nodemailer from 'nodemailer';

require('dotenv').config();


export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

/** @description confirms a user's transaction
   *
   * @param {string} to receiver's email
   * @param {string} bcc receiver's email in blind copy
   * @param {string} subject subject email
   * @param {HTML} html email body
   *
   * @returns {object} email
   */
export const mailOptions = (to, bcc, subject, html) => ({
  from: process.env.EMAIL,
  to,
  subject,
  html
});
