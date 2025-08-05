import ProfileCard from "@/components/Profile/ProfileCard";
import useFeed from "@/hooks/useFeed";
import { Users, Sparkles, Crown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Feed = () => {
  const { profiles, error, loading, handleSendRequest, handleIgnoreProfile } =
    useFeed();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-8 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center my-4">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Discover Developers
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with talented developers who share your passion for coding
              and innovation
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-12 -mt-8">
        <div className="flex flex-col items-center justify-center">
          {/* Loading State */}
          {loading && (
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">
                  Finding amazing developers for you...
                </p>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {error && (
            <Card className="w-full max-w-md mx-auto border-destructive/20">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                  <span className="text-destructive text-xl">⚠️</span>
                </div>
                <h3 className="text-lg font-semibold text-destructive mb-2">
                  Something went wrong
                </h3>
                <p className="text-muted-foreground text-center text-sm">
                  {error}
                </p>
              </CardContent>
            </Card>
          )}

          {/* No Profiles State */}
          {profiles.length === 0 && !loading && !error && (
            <div className="w-full max-w-2xl mx-auto">
              <Card className="border-dashed border-2 border-border py-0">
                <CardContent className="flex flex-col items-center justify-center py-16 px-8">
                  <div className="mb-8 text-center">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      No More Profiles
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      You've discovered all available developers! Check back
                      later for new talent joining the DevSaathi community.
                    </p>
                  </div>

                  {/* Premium CTA */}
                  <Card className="bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20 w-full max-w-sm ">
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                          <Crown className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        Unlock More Profiles
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Premium members get access to exclusive developer
                        profiles and advanced matching features.
                      </p>
                      <Button asChild className="w-full">
                        <Link to="/premium">
                          <Crown className="h-4 w-4 mr-2" />
                          Upgrade to Premium
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Profile Card */}
          {profiles.length > 0 && (
            <div className="w-full flex justify-center">
              <ProfileCard
                key={profiles[0]._id}
                user={profiles[0]}
                handleSendRequest={handleSendRequest}
                handleIgnoreProfile={handleIgnoreProfile}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
