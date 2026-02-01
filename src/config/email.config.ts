// src/config/email.config.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter only if email credentials are provided
export const transporter = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD 
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  : null;

// Only verify if transporter exists
if (transporter) {
  transporter.verify((error, success) => {
    if (error) {
      console.warn("Email configuration warning:", error.message);
    } else {
      console.log("Email server is ready to send messages");
    }
  });
} else {
  console.log("Email service disabled - no credentials provided");
}