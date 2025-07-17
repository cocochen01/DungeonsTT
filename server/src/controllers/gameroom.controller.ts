import { Request, Response } from 'express';
import Gameroom from '../models/gameroom.model';
import User from '../models/user.model';

export const createGameroom = async (req: any, res: Response): Promise<void> => {
  try {
    const { name, members = [] } = req.body;
    const creatorId = req.user._id;

    if (!name) {
      res.status(400).json({ message: "Gameroom name is required." });
      return;
    }

    const uniqueMembers = Array.from(new Set([creatorId.toString(), ...members.map((id: string) => id.toString())]));

    const gameroom = new Gameroom({
      name,
      owner: creatorId,
      members: uniqueMembers,
    });

    await gameroom.save();

    res.status(201).json(gameroom);
  } catch (error) {
    const err = error as Error;
    console.error("Error creatingGameroom:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getGameroom = async (req: any, res: Response): Promise<void> => {
  try {
    const gameroomId = req.params.id;
    const userId = req.user._id;

    const gameroom = await Gameroom.findById(gameroomId).populate("members", "-password");

    if (!gameroom) {
      res.status(404).json({ message: "Gameroom not found" });
      return;
    }

    const isMember = gameroom.members.some(member =>
      member._id.toString() === userId.toString()
    );

    if (!isMember) {
      res.status(403).json({ message: "You are not part of this gameroom" });
      return;
    }

    res.status(200).json(gameroom);
  } catch (error) {
    const err = error as Error;
    console.error("Error getGameroom:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleGameroomStatus = async (req: any, res: Response): Promise<void> => {
  try {
    const gameroomId = req.params.id;
    const userId = req.user._id;

    const gameroom = await Gameroom.findById(gameroomId);

    if (!gameroom) {
      res.status(404).json({ message: "Gameroom not found." });
      return;
    }

    if (gameroom.owner.toString() !== userId.toString()) {
      res.status(403).json({ message: "Only the owner can change gameroom status." });
      return;
    }

    gameroom.isActive = !gameroom.isActive;
    await gameroom.save();
    
    res.status(200).json(gameroom);

  } catch (error) {
    const err = error as Error;
    console.error("Error toggling gameroom status:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getUserGamerooms = async (req: any, res: Response): Promise<void> => {
  try {
    const userId = req.user._id;

    const gamerooms = await Gameroom.find({ members: userId }).populate("members", "-password");

    res.status(200).json(gamerooms);
  } catch (error) {
    const err = error as Error;
    console.error("Error getUserGamerooms:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addUserToGameroom = async (req: any, res: Response): Promise<void> => {
  try {
    const requesterId = req.user._id;
    const gameroomId = req.params.id;
    const { userIdToAdd } = req.body;

    const { gameroom, error, status } = await validateGameroomAccess(gameroomId, requesterId);
    if (error || !gameroom) {
      res.status(status!).json({ message: error });
      return;
    }

    // Check if user to add is valid
    const userToAdd = await User.findById(userIdToAdd);
    if (!userToAdd) {
      res.status(404).json({ message: "User to add not found" });
      return;
    }

    // Check if the user to add is already a member
    if (gameroom.members.includes(userIdToAdd)) {
      res.status(400).json({ message: "User is already a member of the gameroom" });
      return;
    }

    gameroom.members.push(userIdToAdd);
    await gameroom.save();

    res.status(200).json({ message: "User added to gameroom", gameroom: gameroom });
  } catch (error) {
    const err = error as Error;
    console.error("Error addUserToGameroom:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateGameroom = async (req: any, res: Response): Promise<void> => {
  try {
    const requesterId = req.user._id;
    const gameroomId = req.params.id;
    const { newGameroomName } = req.body;

    if (!newGameroomName) {
      res.status(400).json({ message: "Gameroom name is required" });
      return;
    }

    const { gameroom, error, status } = await validateGameroomAccess(gameroomId, requesterId);
    if (error || !gameroom) {
      res.status(status!).json({ message: error });
      return;
    }

    gameroom.name = newGameroomName;
    await gameroom.save();

    res.status(200).json({ message: "Gameroom name updated", gameroom });
  } catch (error) {
    const err = error as Error;
    console.error("Error updateGameroom:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}



const validateGameroomAccess = async (gameroomId: string, requesterId: any) => {
  const gameroom = await Gameroom.findById(gameroomId);
  if (!gameroom) {
    return { error: "Gameroom not found", status: 404 };
  }

  if (!gameroom.members.includes(requesterId.toString())) {
    return { error: "You are not a member of this gameroom", status: 403 };
  }

  return { gameroom };
};
