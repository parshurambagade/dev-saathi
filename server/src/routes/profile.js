import express from "express";
import checkAuth from "../middlewares/auth.js";
import {
  validateChangePasswordData,
  validateProfileEditData,
} from "../utils/validation.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

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
profileRouter.get("/profiles/all", async (req, res) => {
  try {
    const allProfiles = await User.find({});

    if (!allProfiles.length)
      return res.status(404).json({ message: "No profiles found!" });

    return res.status(200).json({
      message: "Fetched all profiles successfully!",
      data: allProfiles,
    });
  } catch (error) {
    return res.status(400).json({ message: "ERROR: " + error?.message });
  }
});

profileRouter.get("/profile", checkAuth, async (req, res) => {
  try {
    const user = req?.user;

    if (!user) throw new Error("User not found!");

    res.status(200).json({ message: "User fetched successfully!", user: user });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error?.message });
  }
});

profileRouter.patch(
  "/profile/edit",
  checkAuth,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      // Handle skills field (it comes as JSON string from FormData)
      if (req.body.skills) {
        try {
          req.body.skills = JSON.parse(req.body.skills);
        } catch (error) {
          return res.status(400).json({ message: "Invalid skills format" });
        }
      }

      validateProfileEditData(req.body);

      const user = req?.user;

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      // Handle image upload to Cloudinary
      if (req.file) {
        try {
          // Delete old image from Cloudinary if it exists and has public_id
          if (user.cloudinaryPublicId) {
            await cloudinary.uploader.destroy(user.cloudinaryPublicId);
          }

          // Upload new image to Cloudinary
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              {
                resource_type: "image",
                folder: "devtinder/profiles",
                transformation: [
                  { width: 500, height: 500, crop: "fill" },
                  { quality: "auto" },
                  { format: "auto" }
                ]
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            ).end(req.file.buffer);
          });

          // Set new image URL and public ID
          req.body.imageUrl = result.secure_url;
          req.body.cloudinaryPublicId = result.public_id;
        } catch (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ message: "Failed to upload image" });
        }
      }

      // Update user fields
      Object.keys(req.body).forEach((key) => {
        if (
          req.body[key] !== undefined &&
          req.body[key] !== null &&
          req.body[key] !== ""
        ) {
          user[key] = req.body[key];
        }
      });

      await user.save();

      res.json({ message: "Profile updated successfully!", data: user });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(400).json({ message: "ERROR: " + error?.message });
    }
  }
);

profileRouter.patch("/profile/changePassword", checkAuth, async (req, res) => {
  try {
    await validateChangePasswordData(req);

    const user = req?.user;

    if (!user) throw new Error("User not found!");

    const hash = await bcrypt.hash(req.body.newPassword, 10);
    user.password = hash;

    await user.save();

    res.json({ message: "Password changed successfully!" });
  } catch (error) {
    return res.status(400).send("ERROR: " + error?.message);
  }
});

export default profileRouter;
