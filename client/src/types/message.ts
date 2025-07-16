export interface Message {
  _id: string;
  senderId: string;
  gameroomId: string;
  text?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}