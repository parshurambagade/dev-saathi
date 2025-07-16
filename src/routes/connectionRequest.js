import express from "express";
import checkAuth from "../middlewares/auth.js";
import User from "../models/user.js";
import ConnectionRequest from "../models/connectionRequest.js";
import { validateSendConnectionRequestData } from "../utils/validation.js";

const connectionRequestRouter = express.Router();

connectionRequestRouter.post(
  "/connectionRequest/send/:status/:receiverId",
  checkAuth,
  async (req, res) => {
    try {
      await validateSendConnectionRequestData(req);

      const { receiverId, status } = req.params;

      const senderId = req.user._id;

      const exhistingRequest = await ConnectionRequest.findOne({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });

      if (exhistingRequest)
        return res.status(400).json({ message: "Request already present!" });

      const connectionRequestData = {
        senderId,
        receiverId,
        status,
      };

      const connectionRequest = new ConnectionRequest(connectionRequestData);

      await connectionRequest.save();

      return res.json({ message: "Request successfull!" });
    } catch (error) {
      res.status(400).json({ message: "ERROR: " + error?.message });
    }
  }
);

export default connectionRequestRouter;
