export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/devtinder";

export const ALLOWED_EDIT_FIELDS = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "skills",
  "about",
  "imageUrl",
];

export const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "imageUrl",
  "age",
  "gender",
  "about",
  "skills",
  "isPremium",
  "premiumExpiry",
  "createdAt",
  "updatedAt",
  "_id",
  "cloudinaryPublicId",
];

export const MEMBERSHIP_TYPES = {
  free: {
    price: 0,
    description: "Free membership with limited features",
  },
  premium: {
    price: 999, // Price in INR
    description: "Premium membership with all features",
  },
};
