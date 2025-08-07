import { API_BASE_URL } from "@/constants";
import createSocketConnection from "@/socket/socket";
import type { RootState } from "@/store/appStore";
import type { UserInfo } from "@/store/slices/userSlice";
import axios from "axios";
import { Ship } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  _id?: string;
  sender: string;
  content: string;
  createdAt?: Date;
}

const useChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { targetUserId } = useParams();
  const [targetUser, setTargetUser] = useState<UserInfo | null>(null);
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
        createdAt: new Date(),
      },
    });

    setInput("");
  };

  const fetchTargetUser = async (targetUserId: string) => {
    try {
      if (!targetUserId) return;

      const response = await axios.get(API_BASE_URL + "/user/" + targetUserId, {
        withCredentials: true,
      });

      if (!response.data.data) throw new Error("Error fetching target user!");

      setTargetUser(response.data.data);
    } catch (error) {
      console.error("Error fetching target user:", error);
      toast.error("Failed to load user information", {
        description: "Please refresh the page and try again.",
      });
    }
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
      toast.error("Failed to load chat messages", {
        description: "Please refresh the page and try again.",
      });
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
    fetchTargetUser(targetUserId);
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
    targetUser,
    userInfo,
  };
};

export default useChat;
