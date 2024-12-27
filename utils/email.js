import nodemailer from 'nodemailer';

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Send OTP email
export async function sendOTP(email, otp) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Your OTP for login',
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`
  });
}

// Send password reset email
export async function sendPasswordResetEmail(email, resetLink) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Request',
    text: `Click the following link to reset your password: ${resetLink}`
  });
}

