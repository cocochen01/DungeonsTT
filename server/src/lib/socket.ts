import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Map of gameroomId -> Set of userIds
const gameroomUsersMap: Record<string, Set<string>> = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;
  const gameroomId = socket.handshake.query.gameroomId as string;

  if (!userId || !gameroomId) {
    console.warn("Missing userId or gameroomId on connection");
    socket.disconnect();
    return;
  }

  socket.join(`gameroom:${gameroomId}`);

  if (!gameroomUsersMap[gameroomId]) {
    gameroomUsersMap[gameroomId] = new Set();
  }
  gameroomUsersMap[gameroomId].add(userId);

  console.log(`Connected UserId: ${userId} to GameroomId: ${gameroomId}, SocketId:`, socket.id);

  io.to(`gameroom:${gameroomId}`).emit("getActiveUsers", Array.from(gameroomUsersMap[gameroomId]));

  socket.on("sendMessage", ({ gameroomId }) => {
    io.to(`gameroom:${gameroomId}`).emit("newMessage");

    socket.broadcast
      .except(`gameroom:${gameroomId}`)
      .emit("gameroomNotification", { gameroomId });
  });

  socket.on("disconnect", () => {
    if (!gameroomUsersMap[gameroomId]) return;

    gameroomUsersMap[gameroomId].delete(userId);

    if (gameroomUsersMap[gameroomId].size === 0) {
      io.to(`gameroom:${gameroomId}`).emit("getActiveUsers", []);
      delete gameroomUsersMap[gameroomId];
    } else {
      io.to(`gameroom:${gameroomId}`).emit("getActiveUsers", Array.from(gameroomUsersMap[gameroomId]));
    }

    if (socket) {
      socket.leave(`gameroom:${gameroomId}`);
    }

    console.log(`Disconnected UserId: ${userId}, SocketId:`, socket.id);
  });
});

export { io, app, server };
