import express from 'express';
import * as CarController from '../backend/controllers/CarController.js';
import { authenticateJWT } from '../backend/middleware/auth.js';

const router = express.Router();

// Add a new car
router.post('/', authenticateJWT, CarController.addCar);

// Update car location
router.put('/:id/location', authenticateJWT, CarController.updateCarLocation);

// Get all active cars
router.get('/active', CarController.getActiveCars);

export default router;

