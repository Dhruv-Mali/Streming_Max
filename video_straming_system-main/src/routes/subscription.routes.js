import { Router } from "express";
import {
  getSubscriptionInfo,
  createSubscription,
  cancelSubscription,
} from "../controllers/subscription.controller.js";
import { isLoggedIn } from "../middleware/auth.middlerware.js";

const router = Router();

router.get("/", isLoggedIn, getSubscriptionInfo);
router.post("/", isLoggedIn, createSubscription);
router.post("/cancel", isLoggedIn, cancelSubscription);

export default router;
