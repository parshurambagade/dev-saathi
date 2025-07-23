import { API_BASE_URL } from "@/constants";
import type { RootState } from "@/store/appStore";
import type { UserInfo } from "@/store/slices/userSlice";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo as updateUserInfo } from "@/store/slices/userSlice";

const useProfile = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(user);

  const dispatch = useDispatch();

  const handleUpdateProfile = async (newUserInfo: UserInfo | null) => {
    try {
      const processedSkills = newUserInfo?.skills
        ? newUserInfo.skills
            .map((s) => s.trim()) // Trim each skill
            .filter((s) => s !== "") // Remove empty strings
        : [];

      const response = await axios.patch(
        API_BASE_URL + "/profile/edit",
        {
          firstName: newUserInfo?.firstName,
          lastName: newUserInfo?.lastName,
          age: newUserInfo?.age,
          gender: newUserInfo?.gender,
          imageUrl: newUserInfo?.imageUrl,
          skills: processedSkills,
          about: newUserInfo?.about,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update profile");
      }
      dispatch(updateUserInfo(response.data.data));
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const handleCancelEdit = () => {
    setUserInfo(user);
  };
  return { userInfo, setUserInfo, handleUpdateProfile, handleCancelEdit };
};

export default useProfile;
