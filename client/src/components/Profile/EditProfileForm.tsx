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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { UserInfo } from "@/store/slices/userSlice";
import {
  Image as ImageIcon,
  Upload,
  Save,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function EditProfileForm({
  user,
  setUserInfo,
  onUpdate,
  onCancel,
  onImageSelect,
  selectedImage,
  imagePreview,
  updating = false,
}: {
  user: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  onUpdate: (newUserInfo: UserInfo | null) => Promise<void>;
  onCancel: () => void;
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  imagePreview: string | null;
  updating?: boolean;
}) {
  if (!user) return null;

  const { firstName, lastName, age, gender, imageUrl, skills, about } = user;

  return (
    <Card className="w-full max-w-lg border-border bg-card shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-foreground">
          Edit Profile
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Update your information to improve connections
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        <form className="space-y-8">
          {/* Name Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-foreground"
                >
                  First Name
                </Label>
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
                  className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-foreground"
                >
                  Last Name
                </Label>
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
                  className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="age"
                  className="text-sm font-medium text-foreground"
                >
                  Age
                </Label>
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
                  className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="gender"
                  className="text-sm font-medium text-foreground"
                >
                  Gender
                </Label>
                <Select
                  defaultValue={gender || undefined}
                  onValueChange={(value) =>
                    setUserInfo((prev) =>
                      prev ? { ...prev, gender: value } : prev
                    )
                  }
                >
                  <SelectTrigger className="w-full bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="space-y-4">
            <div className="flex gap-4 items-center space-y-5">
              {/* Image Preview */}
              <div className="relative aspect-square w-28 h-auto border-2 border-dashed border-border rounded-xl overflow-hidden bg-muted/20 group hover:border-primary/30 transition-all duration-300 mb-0">
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
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <ImageIcon className="h-7 w-7 mx-auto" />
                      <span className="text-xs">No image</span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* File Input */}
              <div className="w-full">
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
                  className="cursor-pointer bg-background border-border file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 hover:file:bg-primary/90"
                />

                <div className="mt-3">
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG, GIF up to 5MB
                  </p>
                  {selectedImage && (
                    <div className="flex items-center justify-start gap-1 mt-2 text-xs text-primary">
                      <CheckCircle className="h-3 w-3" />
                      <span>{selectedImage.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="skills"
                className="text-sm font-medium text-foreground"
              >
                Skills & Technologies
              </Label>
              <Input
                id="skills"
                type="text"
                value={skills?.join(", ") || ""}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const skillsArray = inputValue
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s !== "");

                  if (skillsArray.length > 8) {
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
                placeholder="JavaScript, React, Node.js, Python..."
                className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary"
              />

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Separate with commas
                </span>
                <span
                  className={`${
                    skills && skills.filter((s) => s !== "").length > 8
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {skills ? skills.filter((s) => s !== "").length : 0}/8
                </span>
              </div>

              {skills && skills.filter((s) => s !== "").length > 8 && (
                <div className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  <span>Maximum of 8 skills allowed</span>
                </div>
              )}
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="about"
                className="text-sm font-medium text-foreground"
              >
                Tell your story
              </Label>
              <Textarea
                id="about"
                value={about || ""}
                onChange={(e) =>
                  setUserInfo((prev) =>
                    prev ? { ...prev, about: e.target.value } : prev
                  )
                }
                placeholder="Share your passion for development, your goals, and what makes you unique..."
                maxLength={250}
                className="bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary min-h-[100px] resize-none"
              />

              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  Help others understand who you are
                </span>
                <span
                  className={`${
                    (about?.length || 0) > 225
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {about?.length || 0}/250
                </span>
              </div>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={updating}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onUpdate(user)}
        >
          {updating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
              Updating...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
        <Button
          variant="outline"
          disabled={updating}
          className="flex-1 border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onCancel}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
