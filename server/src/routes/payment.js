import express from "express";
import checkAuth from "../middlewares/auth.js";
import {
  capturePaymentController,
  createOrderController,
  paymentWebhookController,
  verifyPremiumController,
} from "../controllers/payment.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment/create-order", checkAuth, createOrderController);

paymentRouter.post("/payment/capture", checkAuth, capturePaymentController);

paymentRouter.post("/payment/webhook", paymentWebhookController);

paymentRouter.get(
  "/payment/verify-premium",
  checkAuth,
  verifyPremiumController
);

export default paymentRouter;
