import Chat from "../models/chat.js";

export const getChatController = async (req, res) => {
  try {
    const targetUserId = req.params.targetUserId;
    const user = req.user;

    if (!user || !targetUserId)
      return res.status(400).json({ message: "Missing target user Id!" });

    let chat = await Chat.findOne({
      participants: {
        $all: [targetUserId, user._id],
      },
    });

    if (!chat) {
      chat = new Chat({
        participants: [targetUserId, user._id],
        messages: [],
      });

      await chat.save();
    }

    return res
      .status(200)
      .json({ message: "Chat fetched successfully!", data: chat });
  } catch (error) {
    console.error("ERROR: ", error?.message);
    res.status(500).json({ message: "Error fetching chat!" });
  }
};
