import { Request, Response } from 'express';
import Chatroom from '../models/chatroom.model';
import User from '../models/user.model';

export const createChatroom = async (req: any, res: Response): Promise<void> => {
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

export const getChatroom = async (req: any, res: Response): Promise<void> => {
  try {
    const chatroomId = req.params.id;
    const userId = req.user._id;

    const chatroom = await Chatroom.findById(chatroomId).populate("members", "-password");

    if (!chatroom) {
      res.status(404).json({ message: "Chatroom not found" });
      return;
    }

    const isMember = chatroom.members.some(member =>
      member._id.toString() === userId.toString()
    );

    if (!isMember) {
      res.status(403).json({ message: "You are not part of this chatroom" });
      return;
    }

    res.status(200).json(chatroom);
  } catch (error) {
    const err = error as Error;
    console.error("Error getChatroom:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserChatrooms = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;

    const chatrooms = await Chatroom.find({ members: userId }).populate("members", "-password");

    res.status(200).json(chatrooms);
  } catch (error) {
    const err = error as Error;
    console.error("Error getUserChatrooms:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addUserToChatroom = async (req: any, res: Response): Promise<void> => {
  try {
    const requesterId = req.user._id;
    const chatroomId = req.params.id;
    const { userIdToAdd } = req.body;

    const chatroom = await Chatroom.findById(chatroomId);
    // Check if chatroom exists
    if (!chatroom) {
      res.status(404).json({ message: "Chatroom not found" });
      return;
    }

    // Check if the requesting user is a member of chatroom
    if (!chatroom.members.includes(requesterId.toString())) {
      res.status(403).json({ message: "You are not a member of this chatroom" });
      return;
    }

    // Check if user to add is valid
    const userToAdd = await User.findById(userIdToAdd);
    if (!userToAdd) {
      res.status(404).json({ message: "User to add not found" });
      return;
    }

    // Check if the user to add is already a member
    if (chatroom.members.includes(userIdToAdd)) {
      res.status(400).json({ message: "User is already a member of the chatroom" });
      return;
    }

    chatroom.members.push(userIdToAdd);
    await chatroom.save();

    res.status(200).json({ message: "User added to chatroom", chatroom });
  } catch (error) {
    
  }
}