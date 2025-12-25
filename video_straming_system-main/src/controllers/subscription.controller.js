import Subscription from "../models/subscription.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

export const getSubscriptionInfo = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const subscription = await Subscription.findOne({ userId });

  if (!subscription) {
    return res.status(200).json({
      success: true,
      userSubInfo: null,
    });
  }

  res.status(200).json({
    success: true,
    userSubInfo: subscription,
  });
});

export const createSubscription = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { planId } = req.body;

  const existingSubscription = await Subscription.findOne({ userId });

  if (existingSubscription) {
    throw new CustomError("Subscription already exists", 400);
  }

  const currentPeriodStart = new Date();
  const currentPeriodEnd = new Date();
  currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

  const subscription = await Subscription.create({
    userId,
    planId,
    status: "active",
    currentPeriodStart,
    currentPeriodEnd,
  });

  res.status(201).json({
    success: true,
    message: "Subscription created successfully",
    subscription,
  });
});

export const cancelSubscription = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const subscription = await Subscription.findOne({ userId });

  if (!subscription) {
    throw new CustomError("Subscription not found", 404);
  }

  subscription.cancelAtPeriodEnd = true;
  subscription.canceledAt = new Date();
  await subscription.save();

  res.status(200).json({
    success: true,
    message: "Subscription will be canceled at period end",
    subscription,
  });
});
