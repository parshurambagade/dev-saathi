import express from "express";
import checkAuth from "../middlewares/auth.js";

const profileRouter = express.Router();

profileRouter.get("/profile", checkAuth, async (req, res) => {
  try {
    const user = req?.user;

    if (!user) throw new Error("User not found!");

    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: ", error?.message);
  }
});

export default profileRouter;
