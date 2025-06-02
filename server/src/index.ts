import express from 'express';
import authRoutes from './routes/auth.route';
import chatroomRoutes from './routes/chatroom.route';
import messageRoutes from './routes/message.route';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './lib/db';

import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/chatroom", chatroomRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log("server is running on port: " + PORT);
  connectDB();
});

// const server = http.createServer(app);
// server.listen(3001, () => {
//   console.log('Server running on http://localhost:3001');
// });

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//   },
// });

// app.use(cors());
// app.use(express.json());

// app.get('/', (_req, res) => {
//   res.send('Server is running');
// });

// io.on('connection', (socket) => {
//   console.log('Client connected: ', socket.id);

//   socket.on('disconnect', () => {
//     console.log('Client disconnected: ', socket.id);
//   });
// });


