import mongoose from "mongoose";
import sceneSchema from "./scene/scene.model";

const gameroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    scenes: {
      type: [sceneSchema],
      default: []
    },
  },
  {
    timestamps: true,
  }
);

const Gameroom = mongoose.model("Gameroom", gameroomSchema);

export default Gameroom;