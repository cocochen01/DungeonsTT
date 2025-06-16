import express from "express";
import {
  addUserToChatroom,
  createChatroom,
  getChatroom,
  getUserChatrooms,
  updateChatroom
} from "../controllers/chatroom.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

// Get all chatrooms user is a member of
router.get("/mychatrooms", protectRoute, getUserChatrooms);

// Add a user to a chatroom
router.post("/:id/adduser", protectRoute, addUserToChatroom);

// Update chatroom
router.post("/:id/updatechatroom", protectRoute, updateChatroom);

// Get the chatroom from chatroomId
router.get("/:id", protectRoute, getChatroom);

// Create a new chatroom
router.post("/", protectRoute, createChatroom);

export default router;