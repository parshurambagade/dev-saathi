import Order from "../models/order.js";

// Helper function to process webhook events
export async function processWebhookEvent(event, res) {
  // Only process payment.captured events
  if (event.event !== "payment.captured") {
    return res.status(200).json({ message: "Event not processed" });
  }

  const paymentData = event.payload.payment.entity;

  let order;

  // First try to find order by razorpay order_id
  if (paymentData.order_id) {
    order = await Order.findOne({
      razorpayOrderId: paymentData.order_id,
    });
  }

  // If no order found and order_id is null, try to find by amount and recent timestamp
  if (!order && !paymentData.order_id) {
    // Find the most recent order with matching amount that doesn't have a payment ID yet
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    order = await Order.findOne({
      amount: paymentData.amount,
      razorpayPaymentId: { $exists: false }, // Order without payment ID
      createdAt: { $gte: fiveMinutesAgo }, // Created within last 5 minutes
    }).sort({ createdAt: -1 }); // Get the most recent one
  }

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

  user.isPremium = order.membershipType === "premium";
  user.primiumExpiry = user.isPremium
    ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Set expiry to 30 days from now
    : null;
  await user.save();

  return res.status(200).json({
    status: "ok",
    message: "Webhook processed successfully",
  });
}
