import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { _id: true }
);

export default tokenSchema;
