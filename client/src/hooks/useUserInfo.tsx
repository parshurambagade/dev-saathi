import { API_BASE_URL } from "@/constants";
import type { RootState } from "@/store/appStore";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserInfo } from "@/store/slices/userSlice";

const useUserInfo = () => {
  const user = useSelector((store: RootState) => store.user.userInfo);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) return;
      try {
        const response = await axios.get(API_BASE_URL + "/profile", {
          withCredentials: true,
        });

        if (response.status !== 200) {
          throw new Error("Failed to fetch user info");
        }

        if (!response.data.user) {
          console.error("No user data found");
          return;
        }
        dispatch(setUserInfo(response.data.user));
      } catch (error: unknown) {
        if (
          error instanceof axios.AxiosError &&
          error.response?.status === 401
        ) {
          console.error("Unauthorized access, please login!");
          if (pathname !== "/register") navigate("/login");
        } else {
          console.error("Failed to fetch user info:", error);
        }
      }
    };
    fetchUserInfo();
  }, [dispatch, user, navigate, pathname]);

  return { user };
};
export default useUserInfo;
