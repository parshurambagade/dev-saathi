import "dotenv/config";
import express from "express";
import connectDb from "./config/database.js";
import User from "./models/user.js";

const app = express();

app.use(express.json());

app.get("/userById", async (req, res) => {
  const userId = req.body?.userId;

  if (!userId) res.status(400).send("User Id is required!");

  try {
    const user = await User.findById(userId);
    if (!user) res.status(404).send("User not found!");
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong!");
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
    res.status(400).send("Something went wrong!");
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

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, age, gender } = req.body;

  if (!firstName || !lastName || !email || !password || !age || !gender) {
    return res.status(400).send("All fields are required!");
  }

  const userData = {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
  };

  const user = new User(userData);

  try {
    await user.save();
    res.send("User created successfully!");
  } catch (err) {
    res.status(400).send("Error creating user: ", err?.message);
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
