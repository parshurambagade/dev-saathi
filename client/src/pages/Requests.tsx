import RequestCard from "@/components/requests/RequestCard";
import useRequests from "@/hooks/useRequests";
import BackButton from "@/components/ui/back-button";

const Requests = () => {
  const { requests, loading, error, handleAcceptRequest, handleRejectRequest } =
    useRequests();

  return (
    <main className="min-h-[95vh] py-4 md:py-12 px-2 md:px-4 bg-accent">
      <div className="w-full max-w-md mx-auto">
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
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-600">No requests found.</p>
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
