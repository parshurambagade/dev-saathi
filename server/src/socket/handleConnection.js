import { generateRoomId } from "../utils/socket.js";

const handleConnection = (io) => {
  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);
    socket.on("joinChat", ({ userId, targetUserId }) => {
      const roomId = generateRoomId(userId, targetUserId);
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ userId, targetUserId, message }) => {
      const roomId = generateRoomId(userId, targetUserId);
      io.to(roomId).emit("messageReceived", {
        message,
      });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

    // Add other event handlers here
  });
};

export default handleConnection;
