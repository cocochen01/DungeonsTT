import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getMessages, getUsersForSideBar, sendMessage } from "../controllers/message.controller";

const router = express.Router();

//router.get("/user", protectRoute, getUsersForSideBar);

// Get all messages from chatroomId
router.get("/:id", protectRoute, getMessages);

// Send a message to chatroom of chatroomId
router.post("/send/:id", protectRoute, sendMessage)

export default router;