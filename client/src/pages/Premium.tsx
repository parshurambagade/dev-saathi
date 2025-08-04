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
import { Check, Heart, MessageCircle, Zap } from "lucide-react";

const Premium = () => {
  const { membershipPlan, isLoading, isPremium, handlePurchase, selectedPlan } =
    usePremium();

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-6">
        <BackButton />
      </div>

      {!isPremium ? (
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-pink-500 mr-2" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                DevTinder Premium
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-2">
              Unlock exclusive features and supercharge your developer connections
            </p>
            <p className="text-sm text-gray-500">
              Get unlimited access and premium perks to find your perfect match faster
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center justify-center mb-2">
                <Heart className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Unlimited</h3>
              <p className="text-gray-600">Likes & Connections</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center justify-center mb-2">
                <MessageCircle className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Direct</h3>
              <p className="text-gray-600">Messaging Access</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Profile</h3>
              <p className="text-gray-600">Boost & Badge</p>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto">
            <Card
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${membershipPlan.color} ring-2 ring-purple-400`}
            >
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                <Zap className="h-4 w-4 inline mr-1" />
                Most Popular
              </div>

              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center p-3 rounded-full mb-4 bg-purple-200">
                  {membershipPlan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {membershipPlan.name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Perfect for developers who want unlimited access and exclusive features
                </CardDescription>

                <div className="mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{membershipPlan.price}
                    </span>
                    <div className="text-left">
                      {membershipPlan.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ₹{membershipPlan.originalPrice}
                        </div>
                      )}
                      <div className="text-sm text-gray-600">
                        {membershipPlan.duration}
                      </div>
                    </div>
                  </div>
                  {membershipPlan.originalPrice && (
                    <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">
                      Save ₹
                      {membershipPlan.originalPrice - membershipPlan.price}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {membershipPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePurchase(membershipPlan.type)}
                  disabled={isLoading}
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 text-lg transition-all duration-300 cursor-pointer"
                >
                  {isLoading && selectedPlan === membershipPlan.type ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </div>
                  ) : (
                    `Get ${membershipPlan.name}`
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Footer Section */}
          <div className="text-center mt-12 p-6 bg-white rounded-lg shadow-sm border max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Why choose DevTinder Premium?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Join the exclusive community of premium developers. Get unlimited access to all features,
              direct messaging capabilities, priority placement in feeds, and a prestigious premium badge
              that sets you apart from other developers.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
              <span>✨ 30-day money back guarantee</span>
              <span>•</span>
              <span>🔒 Secure payments</span>
              <span>•</span>
              <span>📞 24/7 support</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-12 w-12 text-yellow-500 mr-3" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Premium Member
              </h2>
            </div>
            <p className="text-xl text-gray-600 mb-2">
              You're enjoying all the exclusive premium features!
            </p>
            <p className="text-sm text-gray-500">
              Thank you for being a valued member of our premium community
            </p>
          </div>

          {/* Premium Features Display */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Premium Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <Heart className="h-6 w-6 text-pink-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">Unlimited Interactions</h4>
                  <p className="text-gray-600 text-sm">Send unlimited likes, interests, and ignore requests without any daily limits.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                <MessageCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">Direct Messaging</h4>
                  <p className="text-gray-600 text-sm">Message any developer directly without waiting for mutual connections.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <Zap className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">Profile Boost</h4>
                  <p className="text-gray-600 text-sm">Your profile appears first in everyone's feed, maximizing your visibility.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                <Check className="h-6 w-6 text-purple-500 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">Premium Badge</h4>
                  <p className="text-gray-600 text-sm">Show off your premium status with an exclusive badge on your profile.</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => (window.location.href = "/profile")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg text-lg cursor-pointer"
          >
            Go to Profile
          </Button>
        </div>
      )}
    </main>
  );
};

export default Premium;
