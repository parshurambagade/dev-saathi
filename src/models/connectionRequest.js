import mongoose, { Mongoose } from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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

connectionRequestSchema.index({ senderId: 1, receiverId: 1 });

connectionRequestSchema.pre("save", async function (next) {
  const request = this;

  if (request.senderId.toString() === request.receiverId.toString())
    throw new Error("You cant send request to yourself!");

  next();
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

export default ConnectionRequest;
