import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import type { UserInfo } from "@/store/slices/userSlice";

export default function EditProfileForm({
  user,
  setUserInfo,
  onUpdate,
  onCancel,
  onImageSelect,
  selectedImage,
  imagePreview,
}: {
  user: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  onUpdate: (newUserInfo: UserInfo | null) => Promise<void>;
  onCancel: () => void;
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  imagePreview: string | null;
}) {
  if (!user) return null;

  const { firstName, lastName, age, gender, imageUrl, skills, about } = user;

  return (
    <Card className="w-full max-w-lg max-h-max">
      <CardHeader>
        <CardTitle>Edit your profile</CardTitle>
        <CardDescription>
          Update your profile information to help others find you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Firstname</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) =>
                    setUserInfo((prev) =>
                      prev ? { ...prev, firstName: e.target.value } : prev
                    )
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Lastname</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) =>
                    setUserInfo((prev) =>
                      prev ? { ...prev, lastName: e.target.value } : prev
                    )
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  min="18"
                  max="100"
                  value={age || ""}
                  onChange={(e) =>
                    setUserInfo((prev) =>
                      prev ? { ...prev, age: Number(e.target.value) } : prev
                    )
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  defaultValue={gender}
                  onChange={(e) =>
                    setUserInfo((prev) =>
                      prev ? { ...prev, gender: e.target.value } : prev
                    )
                  }
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="profileImage">Profile Image</Label>
              <div className="flex flex-col gap-3">
                {/* Current/Preview Image */}
                <div className="w-32 h-32 mx-auto border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Current profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-sm">No image</span>
                    </div>
                  )}
                </div>

                {/* File Input */}
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Validate file size (max 5MB)
                      if (file.size > 5 * 1024 * 1024) {
                        alert("Image size should be less than 5MB");
                        return;
                      }

                      // Validate file type
                      if (!file.type.startsWith("image/")) {
                        alert("Please select a valid image file");
                        return;
                      }

                      onImageSelect(file);
                    }
                  }}
                  className="cursor-pointer"
                />

                <p className="text-xs text-gray-500 text-center">
                  Upload an image (max 5MB). Supported formats: JPG, PNG, GIF
                </p>

                {selectedImage && (
                  <p className="text-sm text-green-600 text-center">
                    Selected: {selectedImage.name}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                type="text"
                value={skills?.join(", ") || ""}
                onChange={(e) => {
                  const inputValue = e.target.value;

                  // Allow typing freely, but check skill count when comma is added
                  const skillsArray = inputValue
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s !== "");

                  // Only prevent if user is trying to add more than 8 completed skills
                  // (skills that are followed by a comma or at the end)
                  if (skillsArray.length > 8) {
                    // Don't update if trying to exceed 8 skills
                    return;
                  }

                  setUserInfo((prev) =>
                    prev
                      ? {
                          ...prev,
                          skills: inputValue.split(",").map((s) => s.trim()),
                        }
                      : prev
                  );
                }}
                placeholder="JavaScript, React, Node.js"
              />
              <p className="text-sm text-gray-500">
                Separate skills with commas (Maximum 8 skills)
              </p>
              {skills && skills.filter((s) => s !== "").length > 8 && (
                <p className="text-sm text-amber-600 font-medium">
                  Maximum of 8 skills allowed
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                value={about || ""}
                onChange={(e) =>
                  setUserInfo((prev) =>
                    prev ? { ...prev, about: e.target.value } : prev
                  )
                }
                placeholder="Tell others about yourself..."
                maxLength={250}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          type="submit"
          className="flex-1 cursor-pointer"
          onClick={() => onUpdate(user)}
        >
          Save Changes
        </Button>
        <Button
          variant="outline"
          className="flex-1 cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
