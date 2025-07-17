import express from "express";
import checkAuth from "../middlewares/auth.js";
import {
  validateSendrequestData,
  validateViewRequestData,
} from "../utils/validation.js";
import Request from "../models/request.js";
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:receiverId",
  checkAuth,
  async (req, res) => {
    try {
      await validateSendrequestData(req);

      const { receiverId, status } = req.params;

      const senderId = req.user._id;

      const exhistingRequest = await Request.findOne({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });

      if (exhistingRequest)
        return res.status(400).json({ message: "Request already present!" });

      const requestData = {
        senderId,
        receiverId,
        status,
      };

      const request = new Request(requestData);

      await request.save();

      return res.json({ message: "Request successfull!" });
    } catch (error) {
      res.status(400).json({ message: "ERROR: " + error?.message });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  checkAuth,
  async (req, res) => {
    try {
      validateViewRequestData(req);
      const { status, requestId } = req.params;

      const user = req.user;

      const request = await Request.findOne({
        _id: requestId,
        receiverId: user._id,
        status: "interested",
      });

      if (!request)
        return res.status(404).json({ message: "No request found!" });

      request.status = status;

      await request.save();

      const message =
        status === "accepted"
          ? "Request accepted successfully!"
          : status === "rejected"
          ? "Request rejected successfully!"
          : "";

      res.status(200).json({ message: message, data: request });
    } catch (error) {
      res.status(400).json({ message: "ERROR: " + error?.message });
    }
  }
);
// TODO: remove this api , its just for testing purpose
requestRouter.get("/request/all", async (req, res) => {
  try {
    const allRequests = await Request.find();

    if (!allRequests.length)
      return res.status(404).json({ message: "No requests found!" });

    res.status(200).json({
      message: "Fetched all requests successfully!",
      data: allRequests,
    });
  } catch (error) {
    res.status(400).json({ message: "Error fetching all requests!" });
  }
});

export default requestRouter;
