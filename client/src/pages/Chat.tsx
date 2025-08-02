import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
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
  } = useChat();

  if (!userId) return;

  return (
    <main className="flex h-screen bg-black">
      {/* Chat Interface - Left Side */}
      <div className="flex-1 mx-auto max-w-6xl flex flex-col">
        {/* Chat Header */}
        <div className="bg-zinc-900/50 border-b border-zinc-800 p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
              {getTransportIcon()}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">
                GlobalShip Logistics
              </h1>
              <p className="text-sm text-zinc-400">
                AI Quote Assistant • Get instant shipping quotes
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <ChatBubble key={index} message={message} userId={userId} />
            ))}
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
                />
                <Button
                  onClick={handleSend}
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-zinc-200 rounded-lg h-8 w-8 p-0"
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
