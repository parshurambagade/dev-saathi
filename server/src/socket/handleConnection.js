import { saveMessageService } from "../services/chat.js";
import { generateRoomId } from "../utils/socket.js";

const handleConnection = (io) => {
  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = generateRoomId(userId, targetUserId);
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ userId, targetUserId, message }) => {
      try {
        const roomId = generateRoomId(userId, targetUserId);
        await saveMessageService(userId, targetUserId, message);
        io.to(roomId).emit("messageReceived", {
          message,
        });
      } catch (error) {
        console.error("ERROR: ", error?.message);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

    // Add other event handlers here
  });
};

export default handleConnection;
