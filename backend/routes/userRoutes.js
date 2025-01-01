import express from 'express';
import  * as UserController from '../controllers/UserController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateJWT, UserController.getProfile);

// Update user profile
router.put('/profile', authenticateJWT, UserController.updateProfile);

// Subscribe to news
router.post('/subscribe', authenticateJWT, UserController.subscribe);

// Unsubscribe from news
router.post('/unsubscribe', authenticateJWT, UserController.unsubscribe);

export default router;

