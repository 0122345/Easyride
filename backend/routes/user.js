import express from 'express';
import { prisma } from '../index';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateJWT, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, name: true, credits: true, isSubscribed: true, subscriptionEnds: true }
  });
  res.json(user);
});

// Update user profile
router.put('/profile', authenticateJWT, async (req, res) => {
  const { name } = req.body;
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { name },
    select: { id: true, email: true, name: true }
  });
  res.json(user);
});

// Subscribe to news
router.post('/subscribe', authenticateJWT, async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { isSubscribed: true }
  });
  res.json({ message: 'Subscribed successfully' });
});

// Unsubscribe from news
router.post('/unsubscribe', authenticateJWT, async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { isSubscribed: false }
  });
  res.json({ message: 'Unsubscribed successfully' });
});

export default router;

