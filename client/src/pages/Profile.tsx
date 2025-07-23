import EditProfileForm from "@/components/Profile/EditProfileForm";
import ProfileCard from "@/components/Profile/ProfileCard";
import useProfile from "@/hooks/useProfile";
import type { UserInfo } from "@/store/slices/userSlice";

const Profile = () => {
  const { userInfo, setUserInfo, handleUpdateProfile, handleCancelEdit } =
    useProfile();

  return (
    <main className="flex flex-col md:flex-row justify-center min-h-[96vh] w-full gap-6 py-4 md:py-12 px-2 md:px-4 bg-gray-100 ">
      <EditProfileForm
        user={userInfo}
        setUserInfo={setUserInfo}
        onUpdate={handleUpdateProfile}
        onCancel={handleCancelEdit}
      />
      <ProfileCard user={userInfo as Partial<UserInfo>} />
    </main>
  );
};

export default Profile;
