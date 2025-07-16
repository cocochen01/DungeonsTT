export interface Gameroom {
  _id: string;
  name: string;
  members: string[]; // string of member ids
  createdAt: string;
  updatedAt: string;
}