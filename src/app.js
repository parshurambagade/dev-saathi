import "dotenv/config";
import express from "express";
import connectDb from "./config/database.js";
import User from "./models/user.js";

const app = express();

app.use(express.json());

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
