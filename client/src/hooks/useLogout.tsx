import { API_BASE_URL } from "@/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserStore } from "@/store/slices/userSlice";
import { clearFeedStore } from "@/store/slices/feedSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        API_BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(clearUserStore());
        dispatch(clearFeedStore());
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    handleLogout,
  };
};
export default useLogout;
