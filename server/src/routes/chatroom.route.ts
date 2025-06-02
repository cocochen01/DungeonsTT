import express from "express";
import { createChatroom, getChatroom, getUserChatrooms } from "../controllers/chatroom.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/mychatrooms", protectRoute, getUserChatrooms);
router.get("/:id", protectRoute, getChatroom);
router.post("/", protectRoute, createChatroom);

export default router;