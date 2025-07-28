import { Crown, Star } from "lucide-react";
import type { MembershipPlan } from "./pages/Premium";

export const API_BASE_URL =
  location.hostname === "localhost" ? "http://localhost:7777" : "/api";

export const membershipPlans: MembershipPlan[] = [
  {
    type: "silver",
    name: "Silver Membership",
    price: 500,
    originalPrice: 700,
    duration: "per month",
    icon: <Star className="h-6 w-6" />,
    color: "border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100",
    features: [
      "10 Super Likes per day",
      "See who liked you",
      "Unlimited rewinds",
      "5 Boost per month",
      "Priority customer support",
      "Hide ads",
      "Advanced filters",
    ],
  },
  {
    type: "gold",
    name: "Gold Membership",
    price: 1000,
    originalPrice: 1500,
    duration: "per month",
    icon: <Crown className="h-6 w-6" />,
    color: "border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100",
    features: [
      "Unlimited Super Likes",
      "See who liked you",
      "Unlimited rewinds",
      "30 Boost per month",
      "Priority customer support",
      "Hide ads",
      "Advanced filters",
      "Read receipts",
      "Profile boost",
      "Top picks daily",
    ],
    popular: true,
  },
];
