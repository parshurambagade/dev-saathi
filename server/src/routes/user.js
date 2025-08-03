import express from "express";
import checkAuth from "../middlewares/auth.js";
import {
  getReceivedRequestsController,
  getUserConnectionsController,
  getUserDetailsController,
  getUserFeedController,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get(
  "/user/requests/received",
  checkAuth,
  getReceivedRequestsController
);

userRouter.get("/user/connections", checkAuth, getUserConnectionsController);

userRouter.get("/user/feed", checkAuth, getUserFeedController);

userRouter.get("/user/:targetUserId", checkAuth, getUserDetailsController);

export default userRouter;
