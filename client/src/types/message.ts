import type { User } from "./user";

export interface Message {
  _id: string;
  sender: User;
  gameroomId: string;
  text?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}