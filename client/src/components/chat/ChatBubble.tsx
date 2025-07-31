import { User, Ship } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}
interface ChatBubbleProps {
  message: Message;
  userId: string;
}

export default function ChatBubble({ message, userId }: ChatBubbleProps) {
  if (!userId) return;

  return (
    <div
      className={`flex ${
        message.senderId === userId ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-start space-x-3 max-w-[85%] ${
          message.senderId === userId ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            message.senderId !== userId
              ? "bg-white text-black"
              : "bg-gradient-to-r from-blue-600 to-cyan-500"
          }`}
        >
          {message.senderId === userId ? (
            <User className="w-4 h-4" />
          ) : (
            <Ship className="w-4 h-4 text-white" />
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <div
            className={`rounded-2xl px-4 py-3 ${
              message.senderId === userId
                ? "bg-white text-black ml-auto"
                : "bg-zinc-800 text-white border border-zinc-700"
            }`}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <p
            className={`text-xs px-2 ${
              message.senderId === userId
                ? "text-right text-zinc-500"
                : "text-zinc-500"
            }`}
          >
            {message.timestamp.toString()}
          </p>
        </div>
      </div>
    </div>
  );
}
