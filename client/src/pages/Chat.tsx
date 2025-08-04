import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import BackButton from "@/components/ui/back-button";
import { Send, MessageCircle } from "lucide-react";
import ChatBubble from "@/components/chat/ChatBubble";
import useChat from "@/hooks/useChat";

export default function Chat() {
  const {
    input,
    setInput,
    messages,
    handleSend,
    getTransportIcon,
    userId,
    targetUser,
    userInfo,
  } = useChat();

  if (!userId || !targetUser) return;

  return (
    <main className="flex h-screen bg-black">
      {/* Chat Interface - Left Side */}
      <div className="flex-1 mx-auto max-w-6xl flex flex-col">
        {/* Back Button */}
        <div className="p-4">
          <BackButton />
        </div>

        {/* Chat Header */}
        <div className="bg-zinc-900/50 border-b border-zinc-800 p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
                targetUser?.imageUrl
                  ? "border-2 border-blue-300"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500"
              }`}
            >
              {targetUser?.imageUrl ? (
                <img
                  src={targetUser.imageUrl}
                  alt={`${targetUser.firstName} ${targetUser.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                getTransportIcon()
              )}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">
                {targetUser?.firstName} {targetUser?.lastName}
              </h1>
              <p className="text-sm text-zinc-400 line-clamp-1">
                {targetUser?.about?.slice(0, 50) || "No description available"}
                {targetUser.about && targetUser?.about?.length > 50 ? (
                  <span className="text-zinc-500">...</span>
                ) : null}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="mb-6">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Start the Conversation
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Break the ice! Send your first message to{" "}
                    {targetUser?.firstName} and start building a meaningful
                    connection.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm border max-w-sm">
                  <p className="text-sm text-gray-600">
                    💡 <strong>Tip:</strong> Ask about their coding experience,
                    favorite technologies, or current projects to get the
                    conversation started!
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <ChatBubble
                  key={index}
                  message={message}
                  userId={userId}
                  currentUserImage={userInfo?.imageUrl}
                  targetUserImage={targetUser?.imageUrl}
                />
              ))
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="bg-zinc-900/50 border-t border-zinc-800 p-4 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your shipment requirements..."
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  maxLength={200}
                />
                <Button
                  onClick={handleSend}
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-zinc-200 rounded-lg h-8 w-8 p-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
