const nodemailer = require("nodemailer");

// Load environment variables
require("dotenv").config();

// Create the transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Your email from .env
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Send email function
const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email
    to, // Receiver email
    subject, // Subject of the email
    text, // Plain text body
    html, // HTML body (optional)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

module.exports = sendEmail;
