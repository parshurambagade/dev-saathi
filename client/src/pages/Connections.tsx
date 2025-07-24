import ConnectionCard from "@/components/connections/ConnectionCard";
import useConnections from "@/hooks/useConnections";
import BackButton from "@/components/ui/back-button";

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
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-600">No connections found.</p>
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
