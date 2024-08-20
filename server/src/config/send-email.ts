import nodemailer from "nodemailer";
import {
  NODE_MAILER_EMAIL,
  NODE_MAILER_PASS,
  SEND_EMAIL_FROM,
} from "./env.vars.js";
import { SendEmailOTPType } from "src/types/config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: NODE_MAILER_EMAIL,
    pass: NODE_MAILER_PASS,
  },
});

const sendEmailOTP = async ({ to, subject, html }: SendEmailOTPType) => {
  await transporter.sendMail({
    from: SEND_EMAIL_FROM,
    to: to,
    subject: subject,
    html: html,
  });
};

export {
    sendEmailOTP
}
