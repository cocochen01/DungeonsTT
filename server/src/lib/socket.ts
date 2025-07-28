import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"]
  },
});

// Online users:
const userSocketMap: Record<string, string> = {}; // { userId: socketId }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;
  if (!userId) return;

  console.log(`Connected UserId: ${userId}, SocketId: `, socket.id);

  userSocketMap[userId] = socket.id;

  // Sends events to all connected clients
  io.emit("getActiveUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`Disconnected UserId: ${userId}, SocketId: `, socket.id);

    delete userSocketMap[userId];
    io.emit("getActiveUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };