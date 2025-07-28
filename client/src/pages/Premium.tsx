import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import usePremium from "@/hooks/usePremium";
import { Check, Eye, Heart, MessageCircle, Zap } from "lucide-react";

const Premium = () => {
  const { membershipPlan, isLoading, isPremium, handlePurchase, selectedPlan } =
    usePremium();

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
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
              Unlock premium features and find your perfect match
            </p>
            <p className="text-sm text-gray-500">
              Join thousands of developers who found love with Premium
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center justify-center mb-2">
                <MessageCircle className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">10M+</h3>
              <p className="text-gray-600">Messages sent daily</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center justify-center mb-2">
                <Heart className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">500K+</h3>
              <p className="text-gray-600">Successful matches</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center justify-center mb-2">
                <Eye className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">2M+</h3>
              <p className="text-gray-600">Active developers</p>
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
                  Perfect for serious developers looking for meaningful
                  connections
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
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 text-lg transition-all duration-300"
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
              Join the exclusive community of verified developers. Get priority
              matching with like-minded professionals, unlock advanced search
              filters, and increase your chances of finding meaningful
              connections in the tech industry.
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
        <div className="max-w-6xl mx-auto text-center py-12">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            You are already a Premium member!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for being a valued member of our community. Enjoy your
            premium features and happy connecting!
          </p>
          <Button
            onClick={() => (window.location.href = "/profile")}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg"
          >
            Go to Profile
          </Button>
        </div>
      )}
    </main>
  );
};

export default Premium;
