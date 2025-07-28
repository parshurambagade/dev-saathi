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

// Add raw body parser middleware for webhook
paymentRouter.use(
  "/payment/webhook",
  express.raw({ type: "application/json" })
);

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    console.log("=== WEBHOOK RECEIVED ===");
    console.log("Headers:", req.headers);
    console.log("Raw body:", req.body);

    // Convert raw body to string for signature validation
    const webhookBody = req.body.toString();
    console.log("Webhook body as string:", webhookBody);

    // Check if signature header exists
    const receivedSignature = req.headers["x-razorpay-signature"];
    if (!receivedSignature) {
      console.log("Missing signature header");
      return res.status(400).json({
        message: "Missing signature header",
      });
    }

    // Validate webhook signature
    const isWebhookValid = validateWebhookSignature(
      webhookBody,
      receivedSignature,
      process.env.WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      console.log("Invalid webhook signature");
      return res.status(400).json({
        message: "Invalid signature",
      });
    }

    // Parse webhook data
    const webhookData = JSON.parse(webhookBody);
    console.log("Webhook event:", webhookData.event);

    // Only process payment.captured events
    if (webhookData.event !== "payment.captured") {
      console.log("Ignoring event:", webhookData.event);
      return res.status(200).json({ message: "Event not processed" });
    }

    const paymentData = webhookData.payload.payment.entity;
    console.log("Payment data:", paymentData);

    const order = await Order.findOne({
      razorpayOrderId: paymentData.order_id,
    });

    if (!order) {
      console.log("Order not found for order_id:", paymentData.order_id);
      return res.status(404).json({
        message: "Order not found",
      });
    }

    console.log("Order found:", order);
    order.status = paymentData.status;
    order.razorpayPaymentId = paymentData.id;
    await order.save();

    const user = await User.findById(order.userId);

    if (!user) {
      console.log("User not found for userId:", order.userId);
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Fix: Use order.membershipType instead of order.notes.membershipType
    console.log(
      "Updating user premium status, membershipType:",
      order.membershipType
    );
    user.isPremium = order.membershipType === "premium";
    user.primiumExpiry = user.isPremium
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Set expiry to 30 days from now
      : null;
    await user.save();

    console.log("User updated successfully, isPremium:", user.isPremium);

    return res.status(200).json({
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("Error in webhook:", error);
    res.status(500).json({
      message: "Error verifying payment",
      error: error.message,
    });
  }
});

paymentRouter.get("/payment/verify-premium", checkAuth, async (req, res) => {
  const { user } = req;
  try {
    // Fix typo: premiumExpiery -> primiumExpiry (to match your schema)
    if (
      user.isPremium &&
      user.primiumExpiry &&
      user.primiumExpiry > new Date()
    ) {
      return res.status(200).json({
        isPremium: true,
        premiumExpiry: user.primiumExpiry,
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
