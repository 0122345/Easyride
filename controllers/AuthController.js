// Import necessary modules
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../index.js';
import { sendOTP, sendPasswordResetEmail } from '../utils/email.js';

class AuthController {
  // Email and password signup
  static async signup(req, res) {
    const { email, password, name } = req.body;
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name }
      });
      
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: 'Email already exists' });
    }
  }

  // Email and password login
  static async login(req, res) {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  }

  // Send OTP
  static async sendOTP(req, res) {
    const { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    await prisma.oTP.create({
      data: {
        email,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiration
      }
    });
    
    await sendOTP(email, code);
    res.json({ message: 'OTP sent successfully' });
  }

  // Verify OTP
  static async verifyOTP(req, res) {
    const { email, code } = req.body;
    
    const otp = await prisma.oTP.findFirst({
      where: {
        email,
        code,
        expiresAt: { gt: new Date() }
      }
    });
    
    if (!otp) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }
    
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email } });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    await prisma.oTP.delete({ where: { id: otp.id } });
    res.json({ token });
  }

  // Social login (Google, Facebook, Apple)
  static async socialLogin(req, res) {
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET);
    res.json({ token });
  }

  // Send password reset email
  static async sendPasswordResetEmail(req, res) {
    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    await prisma.passwordReset.create({
      data: {
        email,
        token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour expiration
      }
    });
    
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await sendPasswordResetEmail(email, resetLink);
    res.json({ message: 'Password reset email sent' });
  }

  // Reset password
  static async resetPassword(req, res) {
    const { token, newPassword } = req.body;
    
    const resetRequest = await prisma.passwordReset.findUnique({
      where: { token },
      include: { user: true }
    });
    
    if (!resetRequest || resetRequest.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: resetRequest.user.id },
      data: { password: hashedPassword }
    });
    
    await prisma.passwordReset.delete({ where: { id: resetRequest.id } });
    res.json({ message: 'Password reset successfully' });
  }
}

export default AuthController;

