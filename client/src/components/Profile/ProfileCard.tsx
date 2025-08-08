import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { UserInfo } from "@/store/slices/userSlice";
import { User, Code, Calendar, Heart, X, Crown } from "lucide-react";

const ProfileCard = ({
  user,
  handleSendRequest,
  handleIgnoreProfile,
}: {
  user: Partial<UserInfo>;
  handleSendRequest?: (userId: string) => Promise<void>;
  handleIgnoreProfile?: (requestId: string) => Promise<void>;
}) => {
  if (!user) return;

  const {
    firstName,
    lastName,
    age,
    gender,
    about,
    skills,
    imageUrl,
    isPremium,
  } = user;

  return (
    <Card className="w-full max-w-sm py-0 mx-auto overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-border bg-card backdrop-blur-lg">
      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden group">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={firstName || "Profile"}
              className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-96 bg-primary/20 flex items-center justify-center">
              <User className="h-24 w-24 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Premium Badge - Top Right */}
          {isPremium && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-accent hover:bg-accent/90 text-white border-accent/30 shadow-lg backdrop-blur-sm flex items-center gap-1.5 px-3 py-1.5">
                <Crown className="h-3.5 w-3.5" />
                <span className="text-xs font-semibold">Premium</span>
              </Badge>
            </div>
          )}

          {/* Floating name badge */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-border">
              <h2 className="text-xl font-bold text-foreground mb-3">
                {firstName || "Anonymous"} {lastName || "Developer"}
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
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
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-0 space-y-6">
        {/* About Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <div className="w-1 h-4 bg-primary rounded-full"></div>
            About
          </h4>
          {about ? (
            <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3">
              {about}
            </p>
          ) : (
            <p className="text-muted-foreground/70 leading-relaxed text-sm italic">
              This developer hasn't shared their story yet.
            </p>
          )}
        </div>

        {/* Skills Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <div className="w-1 h-4 bg-accent rounded-full"></div>
            Skills
          </h4>
          {skills &&
          skills.filter((skill: string) => skill.trim()).length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills
                .filter((skill: string) => skill.trim())
                .slice(0, 6)
                .map((skill: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-secondary/50 text-foreground border-border hover:bg-secondary transition-colors"
                  >
                    <Code className="h-3 w-3 mr-1" />
                    {skill.trim()}
                  </Badge>
                ))}
              {skills.filter((skill: string) => skill.trim()).length > 6 && (
                <Badge
                  variant="outline"
                  className="bg-muted text-muted-foreground"
                >
                  +{skills.filter((skill: string) => skill.trim()).length - 6}
                </Badge>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="bg-muted/30 text-muted-foreground/70 border-dashed"
              >
                <Code className="h-3 w-3 mr-1" />
                Skills coming soon
              </Badge>
              <Badge
                variant="outline"
                className="bg-primary/5 text-primary/70 border-dashed border-primary/30"
              >
                New to DevSaathi
              </Badge>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-4">
        <Button
          variant="outline"
          disabled={!handleIgnoreProfile}
          className="cursor-pointer flex-1 h-14 rounded-xl border-2 border-muted-foreground/20 text-muted-foreground hover:bg-muted/50 hover:border-muted-foreground/40 hover:text-foreground transition-all duration-300 font-semibold group"
          onClick={() =>
            handleIgnoreProfile && handleIgnoreProfile(user._id || "")
          }
        >
          <X className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
          Pass
        </Button>
        <Button
          disabled={!handleSendRequest}
          className="cursor-pointer flex-1 h-14 rounded-xl bg-primary hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl group"
          onClick={() => handleSendRequest && handleSendRequest(user._id || "")}
        >
          <Heart className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
          Like
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
