import "dotenv/config";
import express from "express";
import connectDb from "./db/connectDb.js";

const app = express();

connectDb()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(7777, () => {
      console.log("App is running on the port 7777...");
    });
  })
  .catch((err) => console.log("Error: ", err));
