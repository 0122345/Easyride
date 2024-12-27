import { prisma } from '../index';

class UserController {
  // Get user profile
  static async getProfile(req, res) {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, credits: true, isSubscribed: true, subscriptionEnds: true }
    });
    res.json(user);
  }

  // Update user profile
  static async updateProfile(req, res) {
    const { name } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { name },
      select: { id: true, email: true, name: true }
    });
    res.json(user);
  }

  // Subscribe to news
  static async subscribe(req, res) {
    await prisma.user.update({
      where: { id: req.user.id },
      data: { isSubscribed: true }
    });
    res.json({ message: 'Subscribed successfully' });
  }

  // Unsubscribe from news
  static async unsubscribe(req, res) {
    await prisma.user.update({
      where: { id: req.user.id },
      data: { isSubscribed: false }
    });
    res.json({ message: 'Unsubscribed successfully' });
  }
}

export default UserController;

