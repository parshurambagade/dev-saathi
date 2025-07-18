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
];
