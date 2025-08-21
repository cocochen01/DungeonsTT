import mongoose from "mongoose";

const textSchema = new mongoose.Schema(
  {
    content: String,
    x: Number,
    y: Number,
    style: mongoose.Schema.Types.Mixed,
  },
  { _id: true }
);

export default textSchema;