import { prisma } from '../index.js'; // Ensure you have the correct import for prisma
import { io } from '../socketio.js'; // Ensure you have the correct import for io

// Add a new car
export async function addCar(req, res) {
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
export async function updateCarLocation(req, res) {
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
export async function getActiveCars(req, res) {
  const cars = await prisma.car.findMany({
    where: { isActive: true },
    select: { id: true, model: true, latitude: true, longitude: true }
  });
  res.json(cars);
}
