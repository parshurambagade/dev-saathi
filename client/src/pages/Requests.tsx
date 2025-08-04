import RequestCard from "@/components/requests/RequestCard";
import useRequests from "@/hooks/useRequests";
import BackButton from "@/components/ui/back-button";
import { Mail, Heart, UserCheck } from "lucide-react";

const Requests = () => {
  const { requests, loading, error, handleAcceptRequest, handleRejectRequest } =
    useRequests();

  return (
    <main className="min-h-[95vh] py-4 md:py-12 px-2 md:px-4 bg-accent">
      <div className="w-full max-w-xl mx-auto">
        <BackButton />
        <h1 className="font-bold text-3xl text-center mb-2">Your Requests</h1>

        {loading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-600">Loading requests...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-red-600">Error: {error}</p>
          </div>
        )}

        {!loading && !error && requests.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="mb-6">
              <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Pending Requests
              </h3>
              <p className="text-gray-500 leading-relaxed mb-6">
                You don't have any pending connection requests at the moment.
                Keep being active in the community to receive more requests!
              </p>
            </div>

            <div className="space-y-3 w-full max-w-sm">
              <div className="bg-white rounded-lg p-4 shadow-sm border flex items-center gap-3">
                <Heart className="h-6 w-6 text-pink-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700">
                    Stay Active
                  </p>
                  <p className="text-xs text-gray-500">
                    Browse and like profiles to increase visibility
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border flex items-center gap-3">
                <UserCheck className="h-6 w-6 text-green-500 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700">
                    Complete Profile
                  </p>
                  <p className="text-xs text-gray-500">
                    A complete profile attracts more requests
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {requests.length > 0 && (
          <>
            <section className="flex flex-col items-center justify-center gap-4 mt-8">
              {requests.map((request) => (
                <RequestCard
                  key={request._id}
                  request={request}
                  onAccept={handleAcceptRequest}
                  onReject={handleRejectRequest}
                />
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default Requests;
