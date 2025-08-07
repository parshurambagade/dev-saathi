import EditProfileForm from "@/components/Profile/EditProfileForm";
import ProfileCard from "@/components/Profile/ProfileCard";
import useProfile from "@/hooks/useProfile";
import type { UserInfo } from "@/store/slices/userSlice";
import BackButton from "@/components/ui/back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, User } from "lucide-react";

const Profile = () => {
  const {
    userInfo,
    setUserInfo,
    handleUpdateProfile,
    handleCancelEdit,
    handleImageSelect,
    selectedImage,
    imagePreview,
    updating,
  } = useProfile();

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-accent/5 pt-8 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-6">
              <BackButton />
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mr-4 shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                  Your Profile
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Customize your developer profile to connect with like-minded
                professionals
              </p>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-12 -mt-8">
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading your profile...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/5 pt-6 pb-12 sm:pt-8 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-4 sm:mb-6">
            <BackButton />
          </div>
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4">
              <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-2 sm:mb-0 sm:mr-4 shadow-lg">
                <User className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
                Your Profile
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-3 sm:mb-4 px-2 leading-relaxed">
              Customize your developer profile to connect with like-minded
              professionals
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pb-8 sm:pb-12 -mt-6 sm:-mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Edit Form Section */}
          <div className="w-full flex justify-center lg:justify-end ">
            <div className="w-full max-w-lg">
              <EditProfileForm
                user={userInfo}
                setUserInfo={setUserInfo}
                onUpdate={handleUpdateProfile}
                onCancel={handleCancelEdit}
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                imagePreview={imagePreview}
                updating={updating}
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-full flex justify-center ">
            <div className="w-full max-w-sm">
              <div className="sticky top-8">
                <div className="mb-4 text-center lg:text-left">
                  <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center justify-center lg:justify-start gap-2">
                    <div className="w-1 h-4 bg-primary rounded-full"></div>
                    Live Preview
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    See how your profile appears to others
                  </p>
                </div>
                <ProfileCard user={userInfo as Partial<UserInfo>} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
