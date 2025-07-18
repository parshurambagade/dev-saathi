import express from "express";
import checkAuth from "../middlewares/auth.js";
import Request from "../models/request.js";
import { USER_SAFE_DATA } from "../constants.js";
import User from "../models/user.js";

const userRouter = express.Router();

userRouter.get("/user/requests/received", checkAuth, async (req, res) => {
  const user = req.user;

  if (!user)
    return res
      .status(400)
      .json({ message: "No user found, please login again!" });

  const allRequests = await Request.find({
    receiver: user._id,
    status: "interested",
  }).populate("sender", USER_SAFE_DATA);

  if (!allRequests)
    return res.status(400).json({ message: "Error fetching all requests!" });

  res
    .status(200)
    .json({ message: "Fetched all requests successfully!", data: allRequests });
});

userRouter.get("/user/connections", checkAuth, async (req, res) => {
  try {
    const user = req.user;

    if (!user)
      return res
        .status(400)
        .json({ message: "User not found, please log in again!" });

    const requests = await Request.find({
      $or: [
        { sender: user._id, status: "accepted" },
        { receiver: user._id, status: "accepted" },
      ],
    })
      .populate("sender", USER_SAFE_DATA)
      .populate("receiver", USER_SAFE_DATA);

    if (!requests)
      return res.status(400).json({ message: "Error fetching requests!" });

    const data = requests?.map((req) => {
      if (user._id.toString() === req?.receiver?._id.toString())
        return req.sender;
      return req.receiver;
    });

    if (!data)
      return res
        .status(400)
        .json({ message: "Something went wrong while fetching connections!" });

    res
      .status(200)
      .json({ message: "Fetched connections successfully!", data: data });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error?.message });
  }
});

userRouter.get("/user/feed", checkAuth, async (req, res) => {
  try {
    const user = req.user;

    if (!user)
      return res
        .status(400)
        .json({ message: "User not found, please log in again!" });

    const connectionRequests = await Request.find({
      $or: [{ sender: req.user?._id }, { receiver: req.user?._id }],
    });

    if (!connectionRequests)
      return res.status(400).json({ message: "No connection requests found!" });

    const hiddenUsersFromFeed = new Set();

    connectionRequests.forEach((req) => {
      hiddenUsersFromFeed.add(req.sender.toString());
      hiddenUsersFromFeed.add(req.receiver.toString());
    });

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    if (limit > 50) limit = 50;

    const skip = (page - 1) * limit;

    const feedData = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenUsersFromFeed) } },
        { _id: { $ne: user?._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    if (!feedData)
      return res.status(400).json({ message: "Error fetching feed users!" });

    res
      .status(200)
      .json({ message: "Feed fetched successfully!", data: feedData });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error?.message });
  }
});

export default userRouter;
