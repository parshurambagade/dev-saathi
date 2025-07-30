import { API_BASE_URL } from "@/constants";
import { io } from "socket.io-client";

const createSocketConnection = () => {
  return io(API_BASE_URL);
};

export default createSocketConnection;
