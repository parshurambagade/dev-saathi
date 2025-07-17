import mongoose, { Mongoose } from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

requestSchema.index({ senderId: 1, receiverId: 1 });

requestSchema.pre("save", async function (next) {
  const request = this;

  if (request.senderId.toString() === request.receiverId.toString())
    throw new Error("You cant send request to yourself!");

  next();
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
