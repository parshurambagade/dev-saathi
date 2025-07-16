import express from "express";
import { validateRegisterData } from "../utils/validation.js";
import validator from "validator";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email))
      throw new Error("Please enter a valid email address!");

    const user = await User.findOne({ email });

    if (!user) throw new Error("Invalid credentials!");

    const isValidPassword = await user.comparePasswords(password);

    if (!isValidPassword) throw new Error("Invalid credentials!");

    const token = await user.getJWT();

    if (!token) throw new Error("Token not found!");

    res
      .cookie("token", token, { expires: new Date(Date.now() + 7 * 360000000) })
      .send("Login successfull!");
  } catch (error) {
    res.status(400).send("ERROR: ", error?.message);
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    validateRegisterData(req.body);

    const { firstName, lastName, password, email } = req.body;

    const hash = await bcrypt.hash(password, 10);

    if (!hash) throw new Error("Error in password encryption!");

    const user = new User({
      firstName,
      lastName,
      email,
      password: hash,
    });

    await user.save();

    res.send("Registration successfull!");
  } catch (error) {
    res.status(400).send("ERROR: ", error?.message);
  }
});

export default authRouter;
