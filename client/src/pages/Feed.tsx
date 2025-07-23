import ProfileCard from "@/components/Profile/ProfileCard";
import useFeed from "@/hooks/useFeed";

const Feed = () => {
  const { profiles, error, loading } = useFeed();

  return (
    <main className="flex flex-col items-center justify-start space-y-4 py-4 md:py-12 min-h-screen bg-gray-100">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {profiles.length > 0 &&
        profiles.map((profile) => (
          <ProfileCard key={profile._id} user={profile} />
        ))}
    </main>
  );
};

export default Feed;
