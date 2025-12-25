import User from "../models/user.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

// Simple signup without OTP
export const simpleSignup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log('Signup request received:', { name, email });

  if (!name || !email || !password) {
    throw new CustomError("please add all required fields", 400);
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new CustomError("user already exists", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    verified: true, // Auto-verify for simple signup
  });

  user.password = undefined;

  console.log('User created successfully:', user.email);

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    user,
  });
});
