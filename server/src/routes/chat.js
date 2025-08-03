import express from "express";
import checkAuth from "../middlewares/auth.js";
import { getChatController } from "../controllers/chat.js";

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", checkAuth, getChatController);

export default chatRouter;
