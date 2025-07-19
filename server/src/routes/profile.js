import express from "express";
import checkAuth from "../middlewares/auth.js";
import {
  validateChangePasswordData,
  validateProfileEditData,
} from "../utils/validation.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";
const profileRouter = express.Router();

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

profileRouter.patch("/profile/edit", checkAuth, async (req, res) => {
  validateProfileEditData(req.body);

  try {
    const user = req?.user;

    if (!user) res.status(404).json({ message: "User not found!" });

    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));

    await user.save();

    res.json({ message: "Profile updated successfully!", data: user });
  } catch (error) {
    res.status(400).send("ERROR: " + error?.message);
  }
});

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
