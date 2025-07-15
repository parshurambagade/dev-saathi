import "dotenv/config";
import express from "express";
import connectDb from "./config/database.js";
import User from "./models/user.js";
import { validateRegisterData } from "./utils/validation.js";
import bcrypt from "bcrypt";
import validator from "validator";

const app = express();

app.use(express.json());

app.delete("/user", async (req, res) => {
  const userId = req.body?.userId;

  if (!userId) res.status(400).send("User Id is required!");

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) res.status(404).send("User not found!");

    res.send("User deleted successfully!");
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body?.userId;
  const data = req.body;
  if (!userId) res.status(400).send("User Id is required!");

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "firstName",
      "lastName",
      "age",
      "gender",
      "skills",
      "imageUrl",
    ];

    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isUpdateAllowed) throw new Error("These fields can not be updated!");

    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });

    if (!user) res.status(404).send("User not found!");

    res.send("User updated successfully!");
  } catch (error) {
    res.status(400).send("Something went wrong! " + error);
  }
});

app.get("/profile", async (req, res) => {
  const email = req.body?.email;

  if (!email) res.status(400).send("Email is required!");

  try {
    const user = await User.findOne({ email });
    if (!user) res.status(404).send("User not found!");
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong! ");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) throw new Error("Enter valid email!");

    const user = await User.findOne({ email: email });

    if (!user) throw new Error("Invalid credentials!");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new Error("Invalid credentials!");

    res.send("Login successfull! " + user);
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
