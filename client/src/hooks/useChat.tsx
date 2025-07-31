import createSocketConnection from "@/socket/socket";
import type { RootState } from "@/store/appStore";
import { Ship } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

const useChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { targetUserId } = useParams();
  const { userInfo } = useSelector((store: RootState) => store.user);
  const userId = userInfo?._id;

  const handleSend = () => {
    if (!input.trim()) return;

    if (!userId || !targetUserId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: userId,
      receiverId: targetUserId,
      content: input,
      timestamp: new Date(),
    };

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      userId,
      targetUserId,
      message: newMessage,
    });

    setInput("");
  };

  const getTransportIcon = () => {
    // This would be dynamic based on selected transport type
    return <Ship className="w-4 h-4 text-white" />;
  };

  useEffect(() => {
    if (!targetUserId || !userId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ message }) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, [targetUserId, userId]);

  return { input, setInput, messages, handleSend, getTransportIcon, userId };
};

export default useChat;
