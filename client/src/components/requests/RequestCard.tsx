import type { RequestData } from "@/hooks/useRequests";
import type { UserInfo } from "@/store/slices/userSlice";
import { Button } from "../ui/button";

const RequestCard = ({
  request,
  onAccept,
  onReject,
}: {
  request: RequestData;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  const { imageUrl, firstName, lastName, about, age, gender } =
    request.sender as UserInfo;

  return (
    <article className="flex flex-col md:flex-row justify-between  w-full gap-4 p-4 border border-gray-200 rounded-lg bg-white">
      <div className="flex justify-start items-center gap-4">
        <div className="flex-shrink-0">
          <img
            src={imageUrl}
            alt={`${firstName}'s avatar`}
            className="w-full h-auto max-w-16 aspect-square rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-semibold">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2">
            {age ? `${age}${gender ? `, ${gender}` : ""}` : null}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">{about}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="cursor-pointer flex-1 h-10 rounded-lg border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:shadow-md transition-all duration-200 font-semibold group"
          onClick={() => onReject(request._id)}
        >
          <span className="group-hover:scale-105 transition-transform duration-200">
            ✕ Reject
          </span>
        </Button>
        <Button
          variant="default"
          className="cursor-pointer flex-1 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg group"
          onClick={() => onAccept(request._id)}
        >
          <span className="group-hover:scale-105 transition-transform duration-200">
            ✓ Accept
          </span>
        </Button>
      </div>
    </article>
  );
};

export default RequestCard;
