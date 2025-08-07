import { API_BASE_URL } from "@/constants";
import type { UserInfo } from "@/store/slices/userSlice";
import axios from "axios";
import React from "react";
import { toast } from "sonner";

export interface RequestData {
  _id: string;
  sender: UserInfo;
  receiver: string;
  status: "interested" | "ignored" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const useRequests = () => {
  const [requests, setRequests] = React.useState<RequestData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          API_BASE_URL + "/user/requests/received",
          {
            withCredentials: true,
          }
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch requests");
        }
        const data = response.data.data;
        setRequests(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const response = await axios.post(
        API_BASE_URL + `/request/review/accepted/${requestId}`,
        {},
        { withCredentials: true }
      );
      if (response.status !== 200) {
        throw new Error("Failed to accept request");
      }

      const acceptedRequest = requests.find((req) => req._id === requestId);
      setRequests((prev) => prev.filter((req) => req._id !== requestId));

      toast.success("Connection accepted! 🎉", {
        description: `You and ${acceptedRequest?.sender?.firstName} are now connected!`,
      });
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Failed to accept request", {
        description: "Please try again later.",
      });
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      const response = await axios.post(
        API_BASE_URL + `/request/review/rejected/${requestId}`,
        {},
        { withCredentials: true }
      );
      if (response.status !== 200) {
        throw new Error("Failed to reject request");
      }
      setRequests((prev) => prev.filter((req) => req._id !== requestId));

      toast("Request declined", {
        description: "The connection request has been declined.",
      });
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("Failed to decline request", {
        description: "Please try again later.",
      });
    }
  };

  return { requests, loading, error, handleAcceptRequest, handleRejectRequest };
};
export default useRequests;
