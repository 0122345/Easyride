import { Server } from 'socket.io';
import http from 'http';

let io;

// Setup Socket.IO server
export function setupSocketIO(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
}

export { io };

