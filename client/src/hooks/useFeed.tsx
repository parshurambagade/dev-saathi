import { API_BASE_URL } from "@/constants";
import type { RootState } from "@/store/appStore";
import { setError, setLoading, setProfiles } from "@/store/slices/feedSlice";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useFeed = () => {
  const { profiles, error, loading } = useSelector(
    (state: RootState) => state.feed
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchFeed = async () => {
      if (profiles.length > 0) return;
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          API_BASE_URL + "/user/feed?page=1&limit=10",
          {
            withCredentials: true,
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch feed");
        }
        const data = response.data.data;
        dispatch(setError(""));
        dispatch(setProfiles(data));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        dispatch(setError(err.message));
        console.error("Error fetching feed:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchFeed();
  }, [dispatch, profiles.length]);

  const handleSendRequest = async (userId: string) => {
    try {
      if (!userId) {
        throw new Error("User ID is required to send a request");
      }
      const response = await axios.post(
        API_BASE_URL + "/request/send/interested/" + userId,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to send request");
      }

      dispatch(setProfiles(profiles.filter((p) => p._id !== userId)));

      toast.success("Connection request sent!", {
        description: "Your request has been sent successfully. Good luck!",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      dispatch(setError(err.message));
      toast.error("Failed to send request", {
        description: err.message || "Please try again later.",
      });
      console.error("Error sending request:", err);
    }
  };
  const handleIgnoreProfile = async (userId: string) => {
    try {
      if (!userId) {
        throw new Error("User ID is required to ignore a profile");
      }
      const response = await axios.post(
        API_BASE_URL + `/request/send/ignored/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to ignore profile");
      }

      dispatch(setProfiles(profiles.filter((p) => p._id !== userId)));

      toast("Profile passed", {
        description: "Moving on to the next profile...",
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      dispatch(setError(err.message));
      toast.error("Failed to pass profile", {
        description: err.message || "Please try again later.",
      });
      console.error("Error ignoring profile:", err);
    }
  };
  return {
    profiles,
    error,
    setError,
    loading,
    handleSendRequest,
    handleIgnoreProfile,
  };
};

export default useFeed;
