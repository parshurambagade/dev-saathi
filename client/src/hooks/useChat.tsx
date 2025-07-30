import { Ship } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const useChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Welcome to GlobalShip Logistics! I'm here to help you get an instant quote for your international shipment. Let's start with the basics - are you looking to import or export goods?",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      role: "user",
      content: "Hi! I need to export goods from the US to Germany.",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: "3",
      role: "assistant",
      content:
        "Perfect! An export from US to Germany. What type of transport would you prefer - maritime (sea freight), air freight, or do you need a recommendation based on your cargo?",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: "4",
      role: "user",
      content: "I think maritime would be more cost-effective for my shipment.",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: "5",
      role: "assistant",
      content:
        "Great choice! Maritime freight is indeed cost-effective for most shipments. Now, which US port would you like to ship from? Popular options include Los Angeles, Long Beach, New York, or Savannah.",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Thank you! Let me update your shipment details and continue with the next requirement...",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getTransportIcon = () => {
    // This would be dynamic based on selected transport type
    return <Ship className="w-4 h-4 text-white" />;
  };

  return { input, setInput, messages, handleSend, getTransportIcon };
};

export default useChat;
