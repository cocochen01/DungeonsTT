import mongoose from "mongoose";
import gridSchema from "./grid.model";
import tokenSchema from "./token.model";
import drawingSchema from "./drawing.model";
import textSchema from "./text.model";


const sceneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    backgroundImage: { type: String, default: "" },
    grid: { type: gridSchema, default: () => ({}) },
    tokens: [tokenSchema],
    drawings: [drawingSchema],
    images: [String], // replace with object later?
    texts: [textSchema],
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default sceneSchema;
