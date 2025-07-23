import express from 'express';
import authRoutes from './routes/auth.route';
import gameroomRoutes from './routes/gameroom.route';
import messageRoutes from './routes/message.route';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './lib/db';
import { app, server } from './lib/socket';

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
})
);
app.use("/api/auth", authRoutes);
app.use("/api/gameroom", gameroomRoutes);
app.use("/api/message", messageRoutes);

server.listen(PORT, () => {
  console.log("server is running on port: " + PORT);
  connectDB();
});
