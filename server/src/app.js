import "dotenv/config";
import express from "express";
import connectDb from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";
import cors from "cors";
import paymentRouter from "./routes/payment.js";
import { createServer } from "http";
import { Server } from "socket.io";
import handleConnection from "./socket/handleConnection.js";
import chatRouter from "./routes/chat.js";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  },
});

handleConnection(io);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Add webhook route BEFORE express.json() to handle raw body
app.use("/payment/webhook", express.raw({ type: "application/json" }));

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

const PORT = process.env.PORT || 7777;

connectDb()
  .then(() => {
    console.log("Database connected successfully!");
    server.listen(PORT, () => {
      console.log(`App is running on the port ${PORT}...`);
    });
  })
  .catch((err) => console.error("Error: ", err));
