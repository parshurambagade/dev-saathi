import { API_BASE_URL } from "@/constants";
import createSocketConnection from "@/socket/socket";
import type { RootState } from "@/store/appStore";
import axios from "axios";
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

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      userId,
      targetUserId,
      message: {
        sender: userId,
        content: input,
      },
    });

    setInput("");
  };

  const fetchChat = async (targetUserId: string) => {
    try {
      if (!targetUserId) return;

      const response = await axios.get(API_BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      if (!response.data.data.messages)
        throw new Error("Error fetching messages!");

      setMessages([...response.data.data.messages]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("ERROR: ", error?.message);
    }
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

  useEffect(() => {
    if (!targetUserId || !userId) return;
    fetchChat(targetUserId);
  }, [userId, targetUserId]);

  return {
    input,
    setInput,
    messages,
    handleSend,
    getTransportIcon,
    userId,
    fetchChat,
    targetUserId,
  };
};

export default useChat;
