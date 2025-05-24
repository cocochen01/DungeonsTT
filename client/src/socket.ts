import { io } from 'socket.io-client';

export const socket = io('http://localhost:3001');
console.log("Attempting socket connection...");
socket.on('connect_error', (err) => {
  console.error('Socket connection error:', err.message);
});