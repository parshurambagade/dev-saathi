import "dotenv/config";
import express from "express";
import connectDb from "./config/database.js";
import User from "./models/user.js";
import { validateRegisterData } from "./utils/validation.js";
import bcrypt from "bcrypt";
import validator from "validator";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import checkAuth from "./middlewares/auth.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/profile", checkAuth, async (req, res) => {
  try {
    const user = req?.user;
    if (!user) throw new Error("User not authenticated!");
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.post("/sendRequest", checkAuth, async (req, res) => {
  try {
    const user = req?.user;

    if (!user) throw new Error("User not authenticated!");

    res.send("Request is sent by " + user?.firstName);
  } catch (error) {
    res.status(400).send("Error: " + error?.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) throw new Error("Enter valid email!");

    const user = await User.findOne({ email: email });

    if (!user) throw new Error("Invalid credentials!");

    await user?.comparePasswords(password);

    const token = await user?.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 360000000),
    });

    res.send("Login successfull!");
  } catch (error) {
    res.status(400).send("Error: " + error?.message);
  }
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // validate the input data
    validateRegisterData(req.body);

    // create a hash of the password
    const hash = await bcrypt.hash(password, 10);

    const userData = {
      firstName,
      lastName,
      email,
      password: hash,
    };

    const user = new User(userData);
    await user.save();
    res.send("User created successfully!");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

connectDb()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(7777, () => {
      console.log("App is running on the port 7777...");
    });
  })
  .catch((err) => console.log("Error: ", err));
