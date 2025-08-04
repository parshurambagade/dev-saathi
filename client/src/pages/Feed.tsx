import ProfileCard from "@/components/Profile/ProfileCard";
import useFeed from "@/hooks/useFeed";
import { Heart, Users } from "lucide-react";

const Feed = () => {
  const { profiles, error, loading, handleSendRequest, handleIgnoreProfile } =
    useFeed();

  return (
    <main className="flex flex-col items-center justify-start space-y-4 py-4 md:py-12 min-h-screen bg-gray-100">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {profiles.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-md mx-auto">
          <div className="mb-6">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No More Profiles
            </h3>
            <p className="text-gray-500 leading-relaxed">
              You've seen all available developers in the app! Check back later
              for new profiles.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              💡 <strong>Tip:</strong> Premium members get access to more
              profiles!
            </p>
          </div>
        </div>
      )}

      {profiles.length > 0 && (
        <ProfileCard
          key={profiles[0]._id}
          user={profiles[0]}
          handleSendRequest={handleSendRequest}
          handleIgnoreProfile={handleIgnoreProfile}
        />
      )}
    </main>
  );
};

export default Feed;
