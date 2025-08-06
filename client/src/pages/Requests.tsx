import RequestCard from "@/components/requests/RequestCard";
import useRequests from "@/hooks/useRequests";
import BackButton from "@/components/ui/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Heart,
  UserCheck,
  Inbox,
  Sparkles,
  Loader2,
  ArrowRight,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const Requests = () => {
  const { requests, loading, error, handleAcceptRequest, handleRejectRequest } =
    useRequests();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-8 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-6">
            <BackButton />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Inbox className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Connection Requests
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Review and manage incoming connection requests from fellow
              developers
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
                  Loading your requests...
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

          {/* No Requests State */}
          {!loading && !error && requests.length === 0 && (
            <div className="w-full max-w-2xl mx-auto">
              <Card className="border-dashed border-2 border-border">
                <CardContent className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="mb-8 text-center">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Mail className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      No Pending Requests
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      You don't have any pending connection requests at the
                      moment. Keep being active in the community to receive more
                      requests!
                    </p>
                  </div>

                  {/* How to get more requests */}
                  <div className="grid gap-4 w-full max-w-lg mb-8">
                    <Card className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border-pink-200/50 dark:border-pink-800/30">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                          <Heart className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-sm">
                            Stay Active
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Browse and like profiles to increase visibility
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200/50 dark:border-green-800/30">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                          <UserCheck className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-sm">
                            Complete Profile
                          </p>
                          <p className="text-xs text-muted-foreground">
                            A complete profile attracts more requests
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                    <Button asChild className="flex-1">
                      <Link to="/">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Browse Feed
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link to="/profile">
                        <Users className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Requests List */}
          {!loading && !error && requests.length > 0 && (
            <div className="w-full max-w-6xl mx-auto">
              {/* Requests Count */}
              <div className="mb-6 flex justify-center">
                <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 w-fit">
                  <CardContent className="px-6 py-3">
                    <p className="text-sm text-muted-foreground">
                      You have{" "}
                      <span className="font-semibold text-primary">
                        {requests.length}
                      </span>{" "}
                      pending connection request
                      {requests.length !== 1 ? "s" : ""}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Requests Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {requests.map((request) => (
                  <RequestCard
                    key={request._id}
                    request={request}
                    onAccept={handleAcceptRequest}
                    onReject={handleRejectRequest}
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

export default Requests;
