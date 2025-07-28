import express from "express";
import razorpayInstance from "../config/razorpay.js";
import checkAuth from "../middlewares/auth.js";
import Order from "../models/order.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import User from "../models/user.js";
import { MEMBERSHIP_TYPES } from "../constants.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment/create-order", checkAuth, async (req, res) => {
  const { user } = req;
  const { membershipType } = req.body;
  try {
    const options = {
      amount: MEMBERSHIP_TYPES[membershipType]?.price * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      partial_payment: false,
      notes: {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        membershipType: membershipType,
      },
    };

    if (!MEMBERSHIP_TYPES[membershipType]) {
      return res.status(400).json({
        message: "Invalid membership type",
      });
    }

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res.status(500).json({
        message: "Error creating order",
      });
    }

    const savedOrder = new Order({
      userId: user._id,
      amount: options.amount,
      currency: options.currency,
      razorpayOrderId: order.id,
      membershipType: membershipType,
      status: order.status,
    });

    await savedOrder.save();

    res.json({
      message: "Order created successfully",
      data: {
        order: savedOrder,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      req.headers["x-razorpay-signature"],
      process.env.WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      return res.status(400).json({
        message: "Invalid signature",
      });
    }
    const paymentData = req.body.payload.payment.entity;

    const order = await Order.findOne({
      razorpayOrderId: paymentData.order_id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    order.status = paymentData.status;
    order.razorpayPaymentId = paymentData.id;
    await order.save();

    const user = await User.findById(order.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update user membership status
    user.isPremium = order?.notes?.membershipType === "premium";
    user.primiumExpiry = user.isPremium
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Set expiry to 30 days from now
      : null;
    await user.save();

    return res.status(200).json({
      message: "Webhook received successfully",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({
      message: "Error verifying payment",
      error: error.message,
    });
  }
});

paymentRouter.get("/payment/verify-premium", checkAuth, async (req, res) => {
  const { user } = req;
  try {
    if (user.isPremium && user.premiumExpiery > new Date()) {
      return res.status(200).json({
        isPremium: true,
        premiumExpiry: user.premiumExpiry,
      });
    }
    return res.status(200).json({
      isPremium: false,
      message: "User does not have premium membership",
    });
  } catch (error) {
    console.error("Error verifying premium status:", error);
    res.status(500).json({
      message: "Error verifying premium status",
      error: error.message,
    });
  }
});

export default paymentRouter;
