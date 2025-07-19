import { API_BASE_URL } from "@/constants";
import type { RootState } from "@/store/appStore";
import { setError, setLoading, setProfiles } from "@/store/slices/feedSlice";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

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
        dispatch(setProfiles(data));
      } catch (err) {
        dispatch(setError(err.message));
        console.error("Error fetching feed:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchFeed();
  }, [dispatch, profiles.length]);

  return {
    profiles,
    error,
    setError,
    loading,
  };
};

export default useFeed;
