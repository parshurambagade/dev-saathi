import { API_BASE_URL } from "@/constants";
import type { UserInfo } from "@/store/slices/userSlice";
import axios from "axios";
import React from "react";

const useConnections = () => {
  const [connections, setConnections] = React.useState<UserInfo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        if (response.status !== 200) {
          throw new Error("Failed to fetch connections");
        }
        const data = response.data.data;
        setConnections(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  return { connections, loading, error };
};
export default useConnections;
