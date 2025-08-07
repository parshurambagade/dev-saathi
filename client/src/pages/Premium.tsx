import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/ui/back-button";
import usePremium from "@/hooks/usePremium";
import {
  Check,
  Heart,
  MessageCircle,
  Zap,
  Crown,
  Sparkles,
  Star,
  Shield,
  Loader2,
  ArrowRight,
  Infinity as InfinityIcon,
} from "lucide-react";

const Premium = () => {
  const { membershipPlan, isLoading, isPremium, handlePurchase, selectedPlan } =
    usePremium();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/5 pt-6 pb-12 sm:pt-8 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-4 sm:mb-6">
            <BackButton />
          </div>

          {!isPremium ? (
            <div className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4">
                <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4 shadow-lg">
                  <Crown className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                  DevSaathi Premium
                </h1>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-3 sm:mb-4 px-2 leading-relaxed">
                Unlock exclusive features and supercharge your developer
                connections
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4">
                <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4 shadow-lg">
                  <Crown className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                  Premium Member
                </h1>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-3 sm:mb-4 px-2 leading-relaxed">
                You're enjoying all the exclusive premium features!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-8 sm:pb-12 -mt-6 sm:-mt-8">
        {!isPremium ? (
          <div className="flex flex-col items-center">
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 lg:mb-16 w-full max-w-5xl">
              <Card className="text-center bg-primary/10 border-primary/20 hover:border-primary/30 transition-colors duration-300">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
                    <InfinityIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 lg:mb-3">
                    Unlimited
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Likes & Connections
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-accent/10 border-accent/20 hover:border-accent/30 transition-colors duration-300">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
                    <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 lg:mb-3">
                    Direct
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Messaging Access
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-primary/10 border-border hover:border-primary/20 transition-colors duration-300 sm:col-span-2 lg:col-span-1">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
                    <Star className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2 lg:mb-3">
                    Profile
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Boost & Badge
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Pricing Card */}
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Card className="relative overflow-hidden border-2 border-primary/20 shadow-xl">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-bl-lg flex items-center gap-1">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Most Popular</span>
                  <span className="xs:hidden">Popular</span>
                </div>

                <CardHeader className="text-center pb-4 sm:pb-6 pt-6 sm:pt-8 px-4 sm:px-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    {membershipPlan.icon}
                  </div>
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                    {membershipPlan.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm sm:text-base leading-relaxed px-2">
                    Perfect for developers who want unlimited access and
                    exclusive features
                  </CardDescription>

                  <div className="mt-4 sm:mt-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                        ₹{membershipPlan.price}
                      </span>
                      <div className="text-left">
                        {membershipPlan.originalPrice && (
                          <div className="text-xs sm:text-sm text-muted-foreground line-through">
                            ₹{membershipPlan.originalPrice}
                          </div>
                        )}
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          {membershipPlan.duration}
                        </div>
                      </div>
                    </div>
                    {membershipPlan.originalPrice && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 text-xs sm:text-sm">
                        Save ₹
                        {membershipPlan.originalPrice - membershipPlan.price}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-6 sm:pb-8">
                  <ul className="space-y-3 sm:space-y-4">
                    {membershipPlan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
                        </div>
                        <span className="text-foreground text-xs sm:text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePurchase(membershipPlan.type)}
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 sm:py-3 text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl group cursor-pointer"
                    size="lg"
                  >
                    {isLoading && selectedPlan === membershipPlan.type ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        <span className="text-sm sm:text-base">
                          Processing...
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Crown className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm sm:text-base">
                          Get {membershipPlan.name}
                        </span>
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Trust Indicators */}
            <Card className="mt-8 sm:mt-12 lg:mt-16 w-full max-w-4xl bg-card/50 border-border/50">
              <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
                  Why choose DevSaathi Premium?
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto px-2">
                  Join the exclusive community of premium developers. Get
                  unlimited access to all features, direct messaging
                  capabilities, priority placement in feeds, and a prestigious
                  premium badge that sets you apart from other developers.
                </p>
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <span>30-day money back guarantee</span>
                  </div>
                  <div className="hidden sm:block text-border">•</div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                    <span>Secure payments</span>
                  </div>
                  <div className="hidden sm:block text-border">•</div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <span>24/7 support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Premium Member View */
          <div className="flex flex-col items-center">
            {/* Premium Features Display */}
            <Card className="w-full max-w-6xl mb-8 sm:mb-12 border-primary/20 shadow-xl">
              <CardContent className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  <div className="bg-primary/5 border border-primary/20 hover:border-primary/30 transition-colors duration-300 rounded-lg p-4 sm:p-6 lg:p-8 flex items-start gap-3 sm:gap-4 lg:gap-6">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-base sm:text-lg">
                        Unlimited Interactions
                      </h4>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        Send unlimited likes, interests, and ignore requests
                        without any daily limits.
                      </p>
                    </div>
                  </div>

                  <div className="bg-accent/5 border border-accent/20 hover:border-accent/30 transition-colors duration-300 rounded-lg p-4 sm:p-6 lg:p-8 flex items-start gap-3 sm:gap-4 lg:gap-6">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-base sm:text-lg">
                        Direct Messaging
                      </h4>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        Message any developer directly without waiting for
                        mutual connections.
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-border hover:border-primary/20 transition-colors duration-300 rounded-lg p-4 sm:p-6 lg:p-8 flex items-start gap-3 sm:gap-4 lg:gap-6">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-base sm:text-lg">
                        Profile Boost
                      </h4>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        Your profile appears first in everyone's feed,
                        maximizing your visibility.
                      </p>
                    </div>
                  </div>

                  <div className="bg-accent/5 border border-border hover:border-accent/20 transition-colors duration-300 rounded-lg p-4 sm:p-6 lg:p-8 flex items-start gap-3 sm:gap-4 lg:gap-6">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Star className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-base sm:text-lg">
                        Premium Badge
                      </h4>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        Show off your premium status with an exclusive badge on
                        your profile.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => (window.location.href = "/profile")}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2.5 sm:py-3 px-6 sm:px-8 text-sm sm:text-base shadow-lg hover:shadow-xl group cursor-pointer"
              size="lg"
            >
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              <span>Go to Profile</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Premium;
