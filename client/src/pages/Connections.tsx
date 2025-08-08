import ConnectionCard from "@/components/connections/ConnectionCard";
import useConnections from "@/hooks/useConnections";
import BackButton from "@/components/ui/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  MessageCircle,
  Heart,
  Users,
  Sparkles,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Connections = () => {
  const { connections, loading, error } = useConnections();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/5 pt-8 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-6">
            <BackButton />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mr-4 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                Your Connections
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Connect and collaborate with talented developers in your network
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
                  Loading your connections...
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

          {/* No Connections State */}
          {!loading && !error && connections.length === 0 && (
            <div className="w-full max-w-2xl mx-auto">
              <Card className="border-dashed border-2 border-border">
                <CardContent className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="mb-8 text-center">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <UserPlus className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      No Connections Yet
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      Start connecting with fellow developers! Browse profiles
                      and send likes to build your professional network.
                    </p>
                  </div>

                  {/* How it works */}
                  <div className="grid gap-4 w-full max-w-lg mb-8">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Heart className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm">
                          Send Likes
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Browse feed and like profiles you're interested in
                        </p>
                      </div>
                    </div>

                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm">
                          Get Matched
                        </p>
                        <p className="text-xs text-muted-foreground">
                          When they like you back, you become connections
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className="w-full max-w-sm bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <Link to="/" className="cursor-pointer">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Start Discovering Developers
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Connections List */}
          {!loading && !error && connections.length > 0 && (
            <div className="w-full max-w-6xl mx-auto">
              <div className="flex gap-4  justify-center items-stretch flex-wrap">
                {connections.map((connection) => (
                  <ConnectionCard
                    key={connection._id}
                    connection={connection}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connections;
