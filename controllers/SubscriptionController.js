import { prisma } from '../index';

class SubscriptionController {
  // Get subscription status
  static async getStatus(req, res) {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { credits: true, subscriptionEnds: true }
    });
    res.json(user);
  }

  // Charge credits for a service
  static async chargeCredits(req, res) {
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
  }

  // Add credits (this would typically be handled by a payment gateway in a real application)
  static async addCredits(req, res) {
    const { credits } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { credits: { increment: credits } }
    });
    res.json({ message: 'Credits added successfully', totalCredits: user.credits });
  }
}

export default SubscriptionController;

