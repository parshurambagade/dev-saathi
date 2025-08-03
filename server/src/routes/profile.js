import express from "express";
import checkAuth from "../middlewares/auth.js";
import multer from "multer";
import {
  editProfileController,
  getAllProfilesController,
  getProfileController,
} from "../controllers/profile.js";

const profileRouter = express.Router();

// Configure multer to store files in memory for Cloudinary upload
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// TODO: remove this api , its just for testing purpose
profileRouter.get("/profiles/all", getAllProfilesController);

profileRouter.get("/profile", checkAuth, getProfileController);

profileRouter.patch(
  "/profile/edit",
  checkAuth,
  upload.single("profileImage"),
  editProfileController
);

profileRouter.patch("/profile/changePassword", checkAuth);

export default profileRouter;
