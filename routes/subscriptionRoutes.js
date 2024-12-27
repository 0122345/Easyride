import express from 'express';
import SubscriptionController from '../controllers/SubscriptionController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

// Get subscription status
router.get('/status', authenticateJWT, SubscriptionController.getStatus);

// Charge credits for a service
router.post('/charge', authenticateJWT, SubscriptionController.chargeCredits);

// Add credits
router.post('/add-credits', authenticateJWT, SubscriptionController.addCredits);

export default router;

