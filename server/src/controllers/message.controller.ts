import { Request, Response } from 'express';
import User from '../models/user.model';
import Message from '../models/message.model';
import cloudinary from '../lib/cloudinary';

export const getUsersForSideBar = async (req: Request, res: Response): Promise<void> => {
  try {
    const loggedinUserId = req.user._id;
    const filteredUsers = await User.find({_id: {$ne:loggedinUserId}}).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    const err = error as Error;
    console.error("Error in getUsersForSidebar: ", err.message);
    res.status(500).json({error: "Internal server error"});
  }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const {chatroomId} = req.params;
    //const myId = req.user._id;

    const messages = await Message.find({ chatroomId })
      .populate("senderId", "username profilePic")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    const err = error as Error;
    console.error("Error in getMessages: ", err.message);
    res.status(500).json({error: "Internal server error"});
  }
};

export const sendMessage = async (req: Request, res:Response) => {
  try {
    const { text, image } = req.body;
    const { id: chatroomId } = req.params;
    const senderId = req.user._id;

    let imageURL;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageURL = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      chatroomId,
      text,
      image: imageURL,
    });

    await newMessage.save();
    // todo: realtime functionality with socket.io
    res.status(201).json(newMessage);
  } catch (error) {
    const err = error as Error;
    console.error("Error in sendMessage: ", err.message);
    res.status(500).json({error: "Internal server error"});
  }
}