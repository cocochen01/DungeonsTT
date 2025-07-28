import { Server } from "socket.io";
import http from "http";
import express from "express";
import User from "../models/user.model";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"]
  },
});

io.on("connection", async (socket) => {
  const userId = socket.handshake.query.userId;
  if (!userId) return;

  console.log(`Connected User ID: ${userId}, Socket ID:`, socket.id);

  try {
    await User.findByIdAndUpdate(userId, { isOnline: true });
  } catch (error) {
  console.error("Error setting user online:", error);
  }

  socket.on("disconnect", async () => {
    console.log(`Disconnected User ID: ${userId}, Socket ID:`, socket.id);
    try {
      await User.findByIdAndUpdate(userId, { isOnline: false });
    } catch (error) {
      console.error("Error setting user offline:", error);
    }
  });
});

export { io, app, server };