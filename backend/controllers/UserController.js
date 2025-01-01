import { prisma } from '../index.js';

// Get user profile
export async function getProfile(req, res) {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, email: true, name: true, credits: true, isSubscribed: true, subscriptionEnds: true }
  });
  res.json(user);
}

// Update user profile
export async function updateProfile(req, res) {
  const { name } = req.body;
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { name },
    select: { id: true, email: true, name: true }
  });
  res.json(user);
}

// Subscribe to news
export async function subscribe(req, res) {
  await prisma.user.update({
    where: { id: req.user.id },
    data: { isSubscribed: true }
  });
  res.json({ message: 'Subscribed successfully' });
}

// Unsubscribe from news
export async function unsubscribe(req, res) {
  await prisma.user.update({
    where: { id: req.user.id },
    data: { isSubscribed: false }
  });
  res.json({ message: 'Unsubscribed successfully' });
}

