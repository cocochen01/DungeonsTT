import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";

/**
 * Authenticate users with JWT
 * 
 * @param req - Express request object. On success, extends the req field to include user, then populates user.
 * @param res - Express response object for error messages
 * @param next - Express next function
 * @returns Promise<void> from async function
 */

export const protectRoute = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "Unauthorized - No Token Provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    if (!decoded) {
      res.status(401).json({ message: "Unauthorized - Invalid Token" });
      return;
    }

    const user = await User.findById(decoded.userId as JwtPayload).select("-password");

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();

  } catch (error) {
    const err = error as Error;
    console.log("Error in protectRoute middleware", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}