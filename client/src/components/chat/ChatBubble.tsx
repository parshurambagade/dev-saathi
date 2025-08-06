import { formatChatTime } from "@/lib/time";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, CheckCheck } from "lucide-react";

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
  if (!userId) return null;

  const isCurrentUser = message.sender === userId;
  const displayImage = isCurrentUser ? currentUserImage : targetUserImage;

  return (
    <div
      className={`flex w-full ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-end gap-2 max-w-[80%] sm:max-w-[70%] ${
          isCurrentUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar - only show for received messages */}
        {!isCurrentUser && (
          <Avatar className="h-8 w-8 flex-shrink-0 mb-1">
            <AvatarImage src={displayImage} alt="User" />
            <AvatarFallback className="bg-muted text-muted-foreground text-xs">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        )}

        {/* Message Content */}
        <div className="flex flex-col min-w-0">
          {/* Message Bubble */}
          <div
            className={`px-4 py-2.5 rounded-2xl relative group ${
              isCurrentUser
                ? "bg-primary text-primary-foreground rounded-br-md shadow-sm"
                : "bg-muted text-foreground rounded-bl-md border border-border/50"
            }`}
          >
            <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
              {message.content}
            </p>
          </div>

          {/* Message Info */}
          <div
            className={`flex items-center gap-1 mt-1 px-1 ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            <span className="text-xs text-muted-foreground">
              {formatChatTime(message?.createdAt as Date)}
            </span>

            {/* Read Status for sent messages */}
            {isCurrentUser && (
              <div className="text-muted-foreground">
                <CheckCheck className="h-3 w-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
