import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../index';
import { sendOTP, sendPasswordResetEmail } from '../../utils/email';
import passport from '../backend/config';

const router = express.Router();

// Email and password signup
router.post('/signup', async (req, res) => {
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
});

// Email and password login
router.post('/login', async (req, res) => {
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
});

// OTP login
router.post('/otp/send', async (req, res) => {
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
});

router.post('/otp/verify', async (req, res) => {
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
});

// Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign({ userId: (req.user).id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Facebook authentication
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
  const token = jwt.sign({ userId: (req.user).id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Apple authentication
router.get('/apple', passport.authenticate('apple'));

router.get('/apple/callback', passport.authenticate('apple', { session: false }), (req, res) => {
  const token = jwt.sign({ userId: (req.user).id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Password reset
router.post('/password/reset', async (req, res) => {
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
});

router.post('/password/reset/confirm', async (req, res) => {
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
});

export default router;

