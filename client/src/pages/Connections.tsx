import ConnectionCard from "@/components/connections/ConnectionCard";
import useConnections from "@/hooks/useConnections";
import BackButton from "@/components/ui/back-button";
import { UserPlus, MessageCircle, Heart } from "lucide-react";

const Connections = () => {
  const { connections, loading, error } = useConnections();

  return (
    <main className="min-h-[95vh] py-4 md:py-12 px-2 md:px-4 bg-accent">
      <div className="w-full max-w-md mx-auto">
        <BackButton />
        <h1 className="font-bold text-3xl text-center mb-2">
          Your Connections
        </h1>

        {loading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-600">Loading connections...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-red-600">Error: {error}</p>
          </div>
        )}

        {!loading && !error && connections.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="mb-6">
              <UserPlus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Connections Yet
              </h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                Start connecting with fellow developers! Browse profiles in the
                feed and send interest requests to build your professional
                network.
              </p>
            </div>

            <div className="space-y-3 w-full max-w-sm">
              <div className="bg-white rounded-lg p-4 shadow-sm border flex items-center gap-3">
                <Heart className="h-6 w-6 text-pink-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700">
                    Send Likes
                  </p>
                  <p className="text-xs text-gray-500">
                    Browse feed and like profiles
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700">
                    Get Matched
                  </p>
                  <p className="text-xs text-gray-500">
                    When they like you back
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {connections.length > 0 && (
          <>
            <section className="flex flex-col items-center justify-center gap-4 mt-8">
              {connections.map((connection) => (
                <ConnectionCard key={connection._id} connection={connection} />
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default Connections;
