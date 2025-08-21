import mongoose from "mongoose";

const drawingSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["line", "rect", "circle", "freehand"], required: true },
    data: mongoose.Schema.Types.Mixed, // flexible (points, dimensions, etc.)
    color: { type: String, default: "#000000" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { _id: true }
);

export default drawingSchema;
