import { API_BASE_URL } from "@/constants";
import axios from "axios";
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
      toast.error("Failed to verify premium status", {
        description: "Please try again later.",
      });
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
      "Unlimited likes/interests and ignore requests",
      "Direct message without mutual connection",
      "Profile boost in feed (shown first)",
      "Premium badge in profile card",
      "Priority customer support",
      "Advanced matching algorithms",
    ],
  };

  const handlePurchase = async (membershipType: MembershipType) => {
    setIsLoading(true);
    setSelectedPlan(membershipType);

    if (isLoading) {
      toast.loading("Preparing payment...", {
        description: "Setting up your premium membership order.",
      });
    }

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

      const { amount, currency, razorpayOrderId, notes } = order;
      const options = {
        key: razorpayKeyId,
        amount: amount,
        currency: currency,
        name: "DevSaathi",
        description: "Test Transaction",
        order_id: razorpayOrderId, // Use razorpayOrderId instead of orderId
        prefill: {
          name: notes?.firstName + " " + notes?.lastName,
          email: notes?.email,
          contact: notes?.contact,
        },
        theme: {
          color: "#3b82f6",
        },
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            // Capture the payment
            const captureResponse = await axios.post(
              API_BASE_URL + "/payment/capture",
              {
                paymentId: response.razorpay_payment_id,
                amount: amount, // Amount in paise
                orderId: response.razorpay_order_id, // Pass the order ID
              },
              {
                withCredentials: true,
              }
            );

            if (captureResponse.status === 200) {
              toast.success("🎉 Premium activated!", {
                description:
                  "Welcome to DevSaathi Premium! Enjoy your new features.",
              });
              handleVerifyPremium(); // Refresh premium status
            } else {
              throw new Error("Failed to capture payment");
            }
          } catch (error) {
            console.error("Error capturing payment:", error);
            toast.error("Payment processing issue", {
              description:
                "Payment completed but there was an issue. Please contact support.",
            });
          }
        },
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
      toast.error("Payment failed", {
        description:
          "There was an issue processing your payment. Please try again.",
      });
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
