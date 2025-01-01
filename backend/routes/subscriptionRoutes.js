import express from 'express';
import * as SubscriptionController from '../backend/controllers/SubscriptionController.js';
import { authenticateJWT } from '../backend/middleware/auth.js';

const router = express.Router();

// Get subscription status
router.get('/status', authenticateJWT, SubscriptionController.getStatus);

// Charge credits for a service
router.post('/charge', authenticateJWT, SubscriptionController.chargeCredits);

// Add credits
router.post('/add-credits', authenticateJWT, SubscriptionController.addCredits);

export default router;
