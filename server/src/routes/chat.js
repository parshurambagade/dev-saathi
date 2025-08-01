import express from "express";
import Chat from "../models/chat.js";
import checkAuth from "../middlewares/auth.js";
import Request from "../models/request.js";

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", checkAuth, async (req, res) => {
  try {
    const targetUserId = req.params.targetUserId;
    const user = req.user;

    if (!user || !targetUserId)
      return res.status(400).json({ message: "Missing target user Id!" });

    const chat = await Chat.findOne({
      participants: {
        $all: [targetUserId, user._id],
      },
    });

    if (!chat) return res.status(400).json({ message: "No chat found!" });

    return res
      .status(200)
      .json({ message: "Chat fetched successfully!", data: chat });
  } catch (error) {
    console.error("ERROR: ", error?.message);
    res.status(500).json({ message: "Error fetching chat!" });
  }
});

chatRouter.post("/chat/:targetUserId", checkAuth, async (req, res) => {
  try {
    const targetUserId = req.params.targetUserId;
    const user = req.user;
    const { message } = req.body;

    if (!user || !targetUserId || !message)
      return res.status(400).send("Missing target user id or message");

    // check if they are friends or not
    const connected = await Request.findOne({
      $or: [
        { sender: user._id, receiver: targetUserId, status: "accepted" },
        { sender: targetUserId, receiver: user._id, status: "accepted" },
      ],
    });

    if (!connected)
      return res.status(400).json({ message: "You should be friend to chat!" });

    let chat;

    chat = await Chat.findOne({
      participants: {
        $all: [user._id, targetUserId],
      },
    });

    if (!chat) {
      console.log("No existing chat found, creating a new one...");
      chat = new Chat({
        participants: [user._id, targetUserId],
        messages: [],
      });

      await chat.save();
    }

    console.log("Chat: ", chat);

    const newMessage = {
      sender: user._id,
      content: message,
    };

    chat.messages.push(newMessage);

    await chat.save();

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("ERROR: ", error?.message);
    res.status(500).send("Error sending message, " + error?.message);
  }
});

export default chatRouter;
