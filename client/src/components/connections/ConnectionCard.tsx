import type { UserInfo } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, User, Calendar, Code, Crown } from "lucide-react";

const ConnectionCard = ({ connection }: { connection: UserInfo }) => {
  const {
    firstName,
    lastName,
    age,
    gender,
    about,
    skills,
    imageUrl,
    _id,
    isPremium,
  } = connection;

  return (
    <Card className=" max-w-sm w-full h-auto overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border bg-card">
      <CardContent className="p-6 text-center h-full flex flex-col">
        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          {imageUrl ? (
            <Avatar className="h-20 w-20 border-2 border-border">
              <AvatarImage
                src={imageUrl}
                alt={`${firstName || "User"}'s avatar`}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {firstName?.[0]}
                {lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center border-2 border-border">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Name */}
        <div className="mb-3">
          <h3 className="font-bold text-foreground text-lg">
            {firstName || "Anonymous"} {lastName || "Developer"}
          </h3>
        </div>

        {/* Age and Gender */}
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {isPremium && (
            <Badge className="bg-accent/90 text-white border-accent/30 hover:bg-accent">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
          {age && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              <Calendar className="h-3 w-3 mr-1" />
              {age}
            </Badge>
          )}
          {gender && (
            <Badge
              variant="secondary"
              className="bg-accent/10 text-accent border-accent/20 capitalize"
            >
              <User className="h-3 w-3 mr-1" />
              {gender}
            </Badge>
          )}
          {!age && !gender && (
            <Badge
              variant="secondary"
              className="bg-muted/50 text-muted-foreground border-muted"
            >
              <User className="h-3 w-3 mr-1" />
              New Profile
            </Badge>
          )}
        </div>

        {/* About */}
        <div className="flex-1 mb-4">
          {about ? (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {about}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground/70 italic">
              This developer hasn't shared their story yet.
            </p>
          )}
        </div>

        {/* Skills */}
        <div className="mb-6">
          {skills &&
          skills.filter((skill: string) => skill.trim()).length > 0 ? (
            <div className="flex flex-wrap justify-center gap-1">
              {skills
                .filter((skill: string) => skill.trim())
                .slice(0, 3)
                .map((skill: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-secondary/30 text-foreground border-border text-xs"
                  >
                    <Code className="h-2.5 w-2.5 mr-1" />
                    {skill.trim()}
                  </Badge>
                ))}
              {skills.filter((skill: string) => skill.trim()).length > 3 && (
                <Badge
                  variant="outline"
                  className="bg-muted/50 text-muted-foreground text-xs"
                >
                  +{skills.filter((skill: string) => skill.trim()).length - 3}
                </Badge>
              )}
            </div>
          ) : (
            <div className="flex justify-center">
              <Badge
                variant="outline"
                className="bg-muted/30 text-muted-foreground/70 border-dashed text-xs"
              >
                <Code className="h-2.5 w-2.5 mr-1" />
                Skills coming soon
              </Badge>
            </div>
          )}
        </div>

        {/* Chat Button */}
        <Button
          asChild
          className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <Link to={`/chat/${_id}`} className="cursor-pointer">
            <MessageCircle className="h-4 w-4 mr-2" />
            Start Chat
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
export default ConnectionCard;
