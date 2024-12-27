import { prisma } from '../index';
import { io } from '../socketio';

class CarController {
  // Add a new car
  static async addCar(req, res) {
    const { model, plate, latitude, longitude } = req.body;
    const car = await prisma.car.create({
      data: {
        model,
        plate,
        latitude,
        longitude,
        userId: req.user.id
      }
    });
    res.json(car);
  }

  // Update car location
  static async updateCarLocation(req, res) {
    const { id } = req.params;
    const { latitude, longitude } = req.body;
    const car = await prisma.car.update({
      where: { id: parseInt(id), userId: req.user.id },
      data: { latitude, longitude }
    });
    
    // Emit real-time update
    io.emit('carLocationUpdate', car);
    
    res.json(car);
  }

  // Get all active cars
  static async getActiveCars(req, res) {
    const cars = await prisma.car.findMany({
      where: { isActive: true },
      select: { id: true, model: true, latitude: true, longitude: true }
    });
    res.json(cars);
  }
}

export default CarController;

