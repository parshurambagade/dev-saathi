import type { UserInfo } from "@/store/slices/userSlice";

const ConnectionCard = ({ connection }: { connection: UserInfo }) => {
  return (
    <article className="grid max-w-lg grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg bg-white">
      <div className="col-span-1">
        <img
          src={connection.imageUrl}
          alt={`${connection.firstName}'s avatar`}
          className="w-full h-auto aspect-square rounded-full"
        />
      </div>
      <div className="col-span-5 flex flex-col justify-center">
        <h2 className="text-lg font-semibold">
          {connection.firstName} {connection.lastName}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {connection.age
            ? `${connection.age}${
                connection.gender ? `, ${connection.gender}` : ""
              }`
            : null}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2">{connection.about}</p>
      </div>
    </article>
  );
};

export default ConnectionCard;
