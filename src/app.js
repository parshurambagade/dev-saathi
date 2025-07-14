import "dotenv/config";
import express from "express";
import connectDb from "./config/database.js";
import User from "./models/user.js";

const app = express();

app.post("/register", async (req, res) => {
  const userData = {
    firstName: "Parshuram",
    lastName: "Bagade",
    email: "parshu@bagade.com",
    password: "parsh123",
    age: 24,
    gender: "male",
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
