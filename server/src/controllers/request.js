import {
  validateSendrequestData,
  validateViewRequestData,
} from "../utils/validation.js";
import Request from "../models/request.js";
import { USER_SAFE_DATA } from "../constants.js";

export const sendRequestController = async (req, res) => {
  try {
    await validateSendrequestData(req);

    const { receiverId, status } = req.params;

    const senderId = req.user._id;

    const exhistingRequest = await Request.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (exhistingRequest)
      return res.status(400).json({ message: "Request already present!" });

    const requestData = {
      sender: senderId,
      receiver: receiverId,
      status,
    };

    const request = new Request(requestData);

    await request.save();

    return res.json({ message: "Request successfull!" });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error?.message });
  }
};

export const reviewRequestController = async (req, res) => {
  try {
    validateViewRequestData(req);
    const { status, requestId } = req.params;

    const user = req.user;

    const request = await Request.findOne({
      _id: requestId,
      receiver: user._id,
      status: "interested",
    });

    if (!request) return res.status(404).json({ message: "No request found!" });

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
};

export const getAllRequestsController = async (req, res) => {
  try {
    const allRequests = await Request.find()
      .populate("sender", USER_SAFE_DATA)
      .populate("receiver", USER_SAFE_DATA);

    if (!allRequests.length)
      return res.status(404).json({ message: "No requests found!" });

    res.status(200).json({
      message: "Fetched all requests successfully!",
      data: allRequests,
    });
  } catch (error) {
    res.status(400).json({ message: "ERROR: " + error?.message });
  }
};
