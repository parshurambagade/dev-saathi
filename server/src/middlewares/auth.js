import jwt from "jsonwebtoken";
import User from "../models/user.js";

const checkAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(401).send("Unauthorized access, please login!");

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedData;

    if (!_id) throw new Error("Invalid token!");

    const user = await User.findById(_id);

    if (!user) throw new Error("User not found!");

    req.user = user;

    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

export default checkAuth;
