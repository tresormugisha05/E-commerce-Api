"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderCancellationEmail = exports.sendOrderConfirmationEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = void 0;
// src/services/email.service.ts
const email_config_1 = require("../config/email.config");
const emailTemplate_1 = require("../utils/emailTemplate");
const sendEmail = async (options) => {
    if (!email_config_1.transporter) {
        console.log("Email service disabled - skipping email send");
        return;
    }
    try {
        const mailOptions = {
            from: `"Your App" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
        };
        const info = await email_config_1.transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
    }
    catch (error) {
        console.error("Email sending failed:", error);
        throw new Error("Failed to send email");
    }
};
const sendWelcomeEmail = async (email, firstName) => {
    await sendEmail({
        to: email,
        subject: "Welcome to Our Platform!",
        html: (0, emailTemplate_1.welcomeEmailTemplate)(firstName, email),
    });
};
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = async (email, firstName, resetToken) => {
    await sendEmail({
        to: email,
        subject: "Password Reset Request",
        html: (0, emailTemplate_1.passwordResetTemplate)(firstName, resetToken),
    });
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendOrderConfirmationEmail = async (email, firstName, orderId, total) => {
    await sendEmail({
        to: email,
        subject: `Order Confirmation - ${orderId}`,
        html: (0, emailTemplate_1.orderConfirmationTemplate)(firstName, orderId, total),
    });
};
exports.sendOrderConfirmationEmail = sendOrderConfirmationEmail;
const sendOrderCancellationEmail = async (email, firstName, orderId, cancelledBy) => {
    await sendEmail({
        to: email,
        subject: `Order Cancelled - ${orderId}`,
        html: (0, emailTemplate_1.orderCancellationTemplate)(firstName, orderId, cancelledBy),
    });
};
exports.sendOrderCancellationEmail = sendOrderCancellationEmail;
