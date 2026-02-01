"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
// src/config/email.config.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create transporter only if email credentials are provided
exports.transporter = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD
    ? nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    })
    : null;
// Only verify if transporter exists
if (exports.transporter) {
    exports.transporter.verify((error, success) => {
        if (error) {
            console.warn("Email configuration warning:", error.message);
        }
        else {
            console.log("Email server is ready to send messages");
        }
    });
}
else {
    console.log("Email service disabled - no credentials provided");
}
