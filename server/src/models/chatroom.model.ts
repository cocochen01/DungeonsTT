import mongoose from "mongoose";

const chatroomSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const Chatroom = mongoose.model("Chatroom", chatroomSchema);

export default Chatroom;