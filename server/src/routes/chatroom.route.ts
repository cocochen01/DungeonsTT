import express from "express";
import { createChatroom } from "../controllers/chatroom.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/newchatroom", protectRoute, createChatroom);

export default router;