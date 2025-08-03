import { API_BASE_URL } from "@/constants";
import { io } from "socket.io-client";

const createSocketConnection = () => {
  return location.hostname === "localhost"
    ? io(API_BASE_URL)
    : io("/", { path: "/api/socket.io" });
};

export default createSocketConnection;
