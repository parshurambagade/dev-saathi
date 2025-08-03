import Chat from "../models/chat.js";
import Request from "../models/request.js";

export const saveMessageService = async (userId, targetUserId, message) => {
  try {
    if (!userId || !targetUserId || !message)
      throw new Error("Missing target user id or message");

    // check if they are friends or not
    const connected = await Request.findOne({
      $or: [
        { sender: userId, receiver: targetUserId, status: "accepted" },
        { sender: targetUserId, receiver: userId, status: "accepted" },
      ],
    });

    if (!connected) throw new Error("You should be friend to chat!");

    let chat;

    chat = await Chat.findOne({
      participants: {
        $all: [userId, targetUserId],
      },
    });

    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });

      await chat.save();
    }

    chat.messages.push(message);

    await chat.save();
  } catch (error) {
    console.error("ERROR: ", error?.message);
  }
};
