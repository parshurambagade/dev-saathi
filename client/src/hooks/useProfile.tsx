import { API_BASE_URL } from "@/constants";
import type { RootState } from "@/store/appStore";
import type { UserInfo } from "@/store/slices/userSlice";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo as updateUserInfo } from "@/store/slices/userSlice";
import { toast } from "sonner";

const useProfile = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(user);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [updating, setUpdating] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setUserInfo(user);
    // Clean up any preview URLs when user changes
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [user, imagePreview]);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleUpdateProfile = async (newUserInfo: UserInfo | null) => {
    try {
      if (updating) {
        toast.error("Profile update in progress. Please wait.");
        return;
      }

      setUpdating(true);

      const processedSkills = newUserInfo?.skills
        ? newUserInfo.skills
            .map((s) => s.trim()) // Trim each skill
            .filter((s) => s !== "") // Remove empty strings
        : [];

      const formData = new FormData();

      // Add text fields to FormData
      if (newUserInfo?.firstName)
        formData.append("firstName", newUserInfo.firstName);
      if (newUserInfo?.lastName)
        formData.append("lastName", newUserInfo.lastName);
      if (newUserInfo?.age) formData.append("age", newUserInfo.age.toString());
      if (newUserInfo?.gender) formData.append("gender", newUserInfo.gender);
      if (newUserInfo?.about) formData.append("about", newUserInfo.about);
      if (processedSkills.length > 0) {
        formData.append("skills", JSON.stringify(processedSkills));
      }

      // Add image file if selected
      if (selectedImage) {
        formData.append("profileImage", selectedImage);
      }

      const response = await axios.patch(
        API_BASE_URL + "/profile/edit",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update profile");
      }
      dispatch(updateUserInfo(response.data.data));

      toast.success("Profile updated successfully! ✨", {
        description: "Your changes have been saved.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile", {
        description: "Please check your information and try again.",
      });

      throw error;
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setUserInfo(user);
    setSelectedImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
  };

  return {
    userInfo,
    setUserInfo,
    handleUpdateProfile,
    handleCancelEdit,
    handleImageSelect,
    selectedImage,
    imagePreview,
    updating,
  };
};

export default useProfile;
