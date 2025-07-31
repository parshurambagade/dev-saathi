import type { UserInfo } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";

const ConnectionCard = ({ connection }: { connection: UserInfo }) => {
  return (
    <article className="flex max-w-lg  gap-4 p-4 border border-gray-200 rounded-lg bg-white">
      <div className="flex-1">
        <img
          src={connection.imageUrl}
          alt={`${connection.firstName}'s avatar`}
          className="w-full h-auto aspect-square rounded-full"
        />
      </div>
      <div className="flex-4 flex flex-col justify-center">
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
      <div className="flex-1 flex items-center justify-center cursor-pointer">
        <Link
          to={"/chat/" + connection._id}
          className="border rounded-xl bg-secondary text-secondary-foreground hover:opacity-90 text-center py-2 px-3 text-sm"
        >
          Chat
        </Link>
      </div>
    </article>
  );
};

export default ConnectionCard;
