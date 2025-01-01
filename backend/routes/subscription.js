import express from 'express';
import { prisma } from '../index';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

// Get subscription status
router.get('/status', authenticateJWT, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { credits: true, subscriptionEnds: true }
  });
  res.json(user);
});

// Charge credits for a service
router.post('/charge', authenticateJWT, async (req, res) => {
  const { credits } = req.body;
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { credits: { decrement: credits } }
  });
  
  if (user.credits < 0) {
    // Handle insufficient credits
    return res.status(400).json({ error: 'Insufficient credits' });
  }
  
  res.json({ message: 'Credits charged successfully', remainingCredits: user.credits });
});

// Add credits (this would typically be handled by a payment gateway in a real application)
router.post('/add-credits', authenticateJWT, async (req, res) => {
  const { credits } = req.body;
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { credits: { increment: credits } }
  });
  res.json({ message: 'Credits added successfully', totalCredits: user.credits });
});

export default router;

