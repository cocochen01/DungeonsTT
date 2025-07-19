export interface Gameroom {
  _id: string;
  name: string;
  members: string[]; // string of member ids
  isActive: boolean;
  icon: string;
  createdAt: string;
  updatedAt: string;
}