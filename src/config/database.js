import mongoose from "mongoose";
import { MONGO_URI } from "../constants.js";

const connectDb = async () => {
  await mongoose.connect(MONGO_URI);
};

export default connectDb;
