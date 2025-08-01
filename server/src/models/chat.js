import mongoose from "mongoose";
import User from "../models/user.js";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    content: {
      type: String,
      required: true,
      maxLength: 200,
    },
  },
  {
    timestamps: true,
  }
);

const chatSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
  ],
  messages: [messageSchema],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
