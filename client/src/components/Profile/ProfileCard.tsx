import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import type { UserInfo } from "@/store/slices/userSlice";

const ProfileCard = ({
  user,
  handleSendRequest,
  handleIgnoreProfile,
}: {
  user: Partial<UserInfo>;
  handleSendRequest?: (userId: string) => Promise<void>;
  handleIgnoreProfile?: (requestId: string) => Promise<void>;
}) => {
  if (!user) return;

  const { firstName, lastName, age, gender, about, skills, imageUrl } = user;

  return (
    <Card className="w-full min-w-sm max-w-sm overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-0 bg-white backdrop-blur-lg py-0 max-h-max">
      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden group">
          <img
            src={imageUrl}
            alt={firstName}
            className="w-full h-96 object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Floating name badge */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {firstName} {lastName}
              </h2>
              <div className="flex items-center gap-3">
                {age && (
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {age}
                  </span>
                )}
                {gender && (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                    {gender}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-0 space-y-5">
        {about && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              About
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm line-clamp-2">
              {about}
            </p>
          </div>
        )}

        {skills && skills.filter((skill) => skill.trim()).length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
              Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills
                .filter((skill) => skill.trim())
                .slice(0, 8)
                .map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-200/50 hover:shadow-md hover:scale-105 transition-all duration-200"
                  >
                    {skill.trim()}
                  </span>
                ))}
              {skills.filter((skill) => skill.trim()).length > 8 && (
                <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200">
                  +{skills.filter((skill) => skill.trim()).length - 8}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-3">
        <Button
          variant="outline"
          disabled={!handleIgnoreProfile}
          className="cursor-pointer flex-1 h-12 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:shadow-lg transition-all duration-300 font-semibold group"
          onClick={() =>
            handleIgnoreProfile && handleIgnoreProfile(user._id || "")
          }
        >
          <span className="group-hover:scale-110 transition-transform duration-200">
            ✕ Pass
          </span>
        </Button>
        <Button
          variant="default"
          disabled={!handleSendRequest}
          className="cursor-pointer flex-1 h-12 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl group"
          onClick={() => handleSendRequest && handleSendRequest(user._id || "")}
        >
          <span className="group-hover:scale-110 transition-transform duration-200">
            💖 Like
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
