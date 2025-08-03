import express from "express";
import checkAuth from "../middlewares/auth.js";
import {
  getAllRequestsController,
  reviewRequestController,
  sendRequestController,
} from "../controllers/request.js";

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:receiverId",
  checkAuth,
  sendRequestController
);

requestRouter.post(
  "/request/review/:status/:requestId",
  checkAuth,
  reviewRequestController
);
// TODO: remove this api , its just for testing purpose
requestRouter.get("/request/all", getAllRequestsController);

export default requestRouter;
