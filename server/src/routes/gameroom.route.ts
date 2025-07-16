import express from "express";
import {
  addUserToGameroom,
  createGameroom,
  getGameroom,
  getUserGamerooms,
  updateGameroom
} from "../controllers/gameroom.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

// Get all gamerooms user is a member of
router.get("/mygamerooms", protectRoute, getUserGamerooms);

// Add a user to a gameroom
router.post("/:id/adduser", protectRoute, addUserToGameroom);

// Update gameroom
router.post("/:id/updategameroom", protectRoute, updateGameroom);

// Get the gameroom from gameroomId
router.get("/:id", protectRoute, getGameroom);

// Create a new gameroom
router.post("/", protectRoute, createGameroom);

export default router;