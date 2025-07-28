import { API_BASE_URL } from "@/constants";
import axios from "axios";
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";

type MembershipType = "premium";

export interface MembershipPlan {
  type: MembershipType;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}
const usePremium = () => {
  const [selectedPlan, setSelectedPlan] = useState<MembershipType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const handleVerifyPremium = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        API_BASE_URL + "/payment/verify-premium",
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to verify premium status");
      }

      if (!response.data.isPremium) {
        setIsPremium(false);
        return;
      }

      setIsPremium(true);
    } catch (error) {
      console.error("Error verifying premium status:", error);
      alert("Failed to verify premium status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleVerifyPremium();
  }, []);

  const membershipPlan: MembershipPlan = {
    type: "premium",
    name: "Premium Membership",
    price: 999,
    originalPrice: 1499,
    duration: "per month",
    icon: <Crown className="h-6 w-6" />,
    color: "border-purple-300 bg-gradient-to-br from-purple-50 to-pink-100",
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
  };

  const handlePurchase = async (membershipType: MembershipType) => {
    setIsLoading(true);
    setSelectedPlan(membershipType);

    try {
      const response = await axios.post(
        API_BASE_URL + "/payment/create-order",
        {
          membershipType,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to create order");
      }

      if (
        !response.data ||
        !response.data.data.order ||
        !response.data.data.razorpayKeyId
      ) {
        throw new Error("Invalid response from server");
      }
      const { order, razorpayKeyId } = response.data.data;
      console.log("Order created successfully:", order);

      const { amount, currency, orderId, notes } = order;
      const options = {
        key: razorpayKeyId,
        amount: amount,
        currency: currency,
        name: "DevSaathi",
        description: "Test Transaction",
        order_id: orderId,
        prefill: {
          name: notes?.firstName + " " + notes?.lastName,
          email: notes?.email,
          contact: notes?.contact,
        },
        theme: {
          color: "#F37254",
        },
        handler: handleVerifyPremium,
      };

      // @ts-expect-error Razorpay global object
      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded");
      }

      // @ts-expect-error Razorpay global object
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  return {
    membershipPlan,
    isLoading,
    isPremium,
    handlePurchase,
    selectedPlan,
  };
};

export default usePremium;
