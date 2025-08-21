import mongoose from "mongoose";

const gridSchema = new mongoose.Schema(
  {
    cellSize: { type: Number, default: 50, min: 1, max: 500 },
    rows: { type: Number, default: 100, min: 1, max: 500 },
    cols: { type: Number, default: 100, min: 1, max: 500 },
    lineColor: { type: Number, default: 0xcccccc },
    lineWidth: { type: Number, default: 1 },
  },
  { _id: false }
);

export default gridSchema;