import express from 'express';
import CarController from '../controllers/CarController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

// Add a new car
router.post('/', authenticateJWT, CarController.addCar);

// Update car location
router.put('/:id/location', authenticateJWT, CarController.updateCarLocation);

// Get all active cars
router.get('/active', CarController.getActiveCars);

export default router;

