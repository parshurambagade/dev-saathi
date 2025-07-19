import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import type { Profile } from "@/store/slices/feedSlice";

const ProfileCard = ({ user }: { user: Profile }) => {
  if (!user) return;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { firstName, lastName, age, gender, about, skills, imageUrl } = user;

  return (
    <Card className="w-full pt-0 max-w-sm mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-b from-white to-gray-50">
      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={firstName}
            className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
            {firstName + " " + lastName}
          </CardTitle>
          <div className="flex justify-center gap-4 text-sm text-gray-600 mb-3">
            {age && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                {age} years
              </span>
            )}
            {gender && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium capitalize">
                {gender}
              </span>
            )}
          </div>
        </div>
        {about && (
          <CardDescription className="text-center text-gray-700 line-clamp-3 leading-relaxed">
            {about}
          </CardDescription>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-center space-x-4">
        <Button
          variant="outline"
          className="flex-1 max-w-[120px] h-12 rounded-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 font-semibold"
        >
          Ignore
        </Button>
        <Button
          variant="default"
          className="flex-1 max-w-[120px] h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg"
        >
          Interested
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
