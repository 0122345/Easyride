import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
// import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import carRoutes from './routes/carRoutes.js';
// import subscriptionRoutes from './routes/subscriptionRoutes.js';
// import { setupSocketIO } from './socketio.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Initialize Prisma client
export const prisma = new PrismaClient();

// Middleware
app.use(express.json());

// // Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Routes
// app.use('/auth', authRoutes);
// app.use('/user', userRoutes);
// app.use('/car', carRoutes);
// app.use('/subscription', subscriptionRoutes);

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

// Setup Socket.IO
// setupSocketIO(server);

