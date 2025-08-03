import { formatChatTime } from "@/lib/time";
import { User, Ship } from "lucide-react";

interface Message {
  _id?: string;
  sender: string;
  content: string;
  createdAt?: Date;
}

interface ChatBubbleProps {
  message: Message;
  userId: string;
  currentUserImage?: string;
  targetUserImage?: string;
}

export default function ChatBubble({
  message,
  userId,
  currentUserImage,
  targetUserImage,
}: ChatBubbleProps) {
  if (!userId) return;

  const isCurrentUser = message.sender === userId;
  const displayImage = isCurrentUser ? currentUserImage : targetUserImage;

  return (
    <div
      className={`flex ${
        message.sender === userId ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-start space-x-3 max-w-[85%] ${
          message.sender === userId ? "flex-row-reverse space-x-reverse" : ""
        }`}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${
            message.sender !== userId
              ? "bg-white text-black border-2 border-gray-200"
              : "bg-gradient-to-r from-blue-600 to-cyan-500 border-2 border-blue-300"
          }`}
        >
          {displayImage ? (
            <img
              src={displayImage}
              alt={isCurrentUser ? "Your avatar" : "User avatar"}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                // Fallback to icon if image fails to load
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}

          {/* Fallback icons */}
          <div className={displayImage ? "hidden" : ""}>
            {message.sender === userId ? (
              <User className="w-4 h-4" />
            ) : (
              <Ship className="w-4 h-4 text-white" />
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div
            className={`rounded-2xl px-4 py-3 ${
              message.sender === userId
                ? "bg-white text-black ml-auto"
                : "bg-zinc-800 text-white border border-zinc-700"
            }`}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <p
            className={`text-xs px-2 ${
              message.sender === userId
                ? "text-right text-zinc-500"
                : "text-zinc-500"
            }`}
          >
            {formatChatTime(message?.createdAt as Date)}
          </p>
        </div>
      </div>
    </div>
  );
}
