import mongoose, { Mongoose } from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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

requestSchema.index({ sender: 1, receiver: 1 });

requestSchema.pre("save", async function (next) {
  const request = this;

  if (request.sender.toString() === request.receiver.toString())
    throw new Error("You cant send request to yourself!");

  next();
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
