import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/ui/back-button";
import {
  Send,
  MessageCircle,
  Code2,
  Heart,
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  Crown,
} from "lucide-react";
import ChatBubble from "@/components/chat/ChatBubble";
import useChat from "@/hooks/useChat";

export default function Chat() {
  const {
    input,
    setInput,
    messages,
    handleSend,
    userId,
    targetUser,
    userInfo,
  } = useChat();

  if (!userId || !targetUser) {
    return (
      <div className="h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageCircle className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground">
              Loading conversation...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Chat Header - Sticky */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border z-30 shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Back Button - Mobile Only */}
              <Button
                variant="ghost"
                size="sm"
                className="sm:hidden p-2 h-auto cursor-pointer"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              {/* Back Button - Desktop */}
              <div className="hidden sm:block">
                <BackButton />
              </div>

              {/* User Info */}
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage
                  src={targetUser?.imageUrl}
                  alt={`${targetUser?.firstName}`}
                />
                <AvatarFallback className="bg-primary/20 text-primary text-sm font-medium">
                  {targetUser?.firstName?.[0]}
                  {targetUser?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-foreground truncate">
                    {targetUser?.firstName} {targetUser?.lastName}
                  </h2>
                  {targetUser?.isPremium && (
                    <Badge className="bg-accent/90 text-white border-accent/30 text-xs px-1.5 py-0.5">
                      <Crown className="h-2.5 w-2.5 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">
                    Active now
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex h-9 w-9 p-0 cursor-pointer"
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex h-9 w-9 p-0 cursor-pointer"
              >
                <Video className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 cursor-pointer"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 min-h-[calc(100vh-180px)]">
        {messages.length === 0 ? (
          /* Enhanced Empty State */
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-280px)] text-center px-4">
            {/* Profile Preview */}
            <div className="mb-8">
              <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-primary/10">
                <AvatarImage
                  src={targetUser?.imageUrl}
                  alt={targetUser?.firstName}
                />
                <AvatarFallback className="bg-primary/20 text-primary text-lg font-semibold">
                  {targetUser?.firstName?.[0]}
                  {targetUser?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {targetUser?.firstName} {targetUser?.lastName}
                </h3>
                {targetUser?.isPremium && (
                  <Badge className="bg-accent/90 text-white border-accent/30 mb-2">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium Member
                  </Badge>
                )}
              </div>

              {targetUser?.about && (
                <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-4">
                  {targetUser.about}
                </p>
              )}

              {/* Skills */}
              {targetUser?.skills && targetUser.skills.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto">
                  {targetUser.skills.slice(0, 4).map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="max-w-md mx-auto">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Say hello to {targetUser?.firstName}! 👋
              </h4>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Start a conversation about your shared interests in development
                and technology.
              </p>

              {/* Quick Starters */}
              <div className="grid gap-3">
                <Card
                  className="p-4 hover:bg-muted/50 transition-colors cursor-pointer border-dashed"
                  onClick={() =>
                    setInput(
                      `Hi ${targetUser?.firstName}! I saw your profile and would love to connect. What technologies are you working with lately?`
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Code2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        Ask about tech stack
                      </p>
                      <p className="text-xs text-muted-foreground">
                        What are you building?
                      </p>
                    </div>
                  </div>
                </Card>

                <Card
                  className="p-4 hover:bg-muted/50 transition-colors cursor-pointer border-dashed"
                  onClick={() =>
                    setInput(
                      `Hey ${targetUser?.firstName}! I'm interested in connecting with fellow developers. Would you like to share your coding journey?`
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <Heart className="h-4 w-4 text-accent" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">
                        Share experiences
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Talk about your journey
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          /* Messages */
          <div className="space-y-4 pb-24">
            {messages.map((message, index) => (
              <ChatBubble
                key={message._id || index}
                message={message}
                userId={userId}
                currentUserImage={userInfo?.imageUrl}
                targetUserImage={targetUser?.imageUrl}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sticky Input Area */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t border-border z-10">
        <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message ${targetUser?.firstName}...`}
                className="min-h-[44px] py-3 px-4 pr-12 rounded-2xl border-border bg-muted/30 focus:bg-background transition-colors resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                maxLength={1000}
              />

              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {input.length > 800 && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {input.length}/1000 characters
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
