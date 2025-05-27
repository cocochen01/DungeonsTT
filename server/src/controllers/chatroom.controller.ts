import { Request, Response } from 'express';
import Chatroom from '../models/chatroom.model';

export const createChatroom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, members = [] } = req.body;
    const creatorId = req.user._id;

    if (!name) {
      res.status(400).json({ message: "Chatroom name is required." });
      return;
    }

    const uniqueMembers = Array.from(new Set([creatorId.toString(), ...members]));

    const chatroom = new Chatroom({ name, members: uniqueMembers });
    await chatroom.save();

    res.status(201).json(chatroom);
  } catch (error) {
    const err = error as Error;
    console.error("Error creatingChatroom:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};