import express from "express";
import checkAuth from "../middlewares/auth.js";
import Request from "../models/request.js";

const userRouter = express.Router();

userRouter.get("/user/requests/received", checkAuth, async (req, res) => {
  const user = req.user;

  if (!user)
    return res
      .status(400)
      .json({ message: "No user found, please login again!" });

  const allRequests = await Request.find({
    receiverId: user._id,
    status: "interested",
  }).populate("senderId", [
    "firstName",
    "lastName",
    "imageUrl",
    "age",
    "gender",
    "about",
    "skills",
  ]);

  if (!allRequests)
    return res.status(400).json({ message: "Error fetching all requests!" });

  res
    .status(200)
    .json({ message: "Fetched all requests successfully!", data: allRequests });
});
export default userRouter;
