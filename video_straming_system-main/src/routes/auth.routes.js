import { Router } from "express";
import {
  forgotPassword,
  getProfile,
  login,
  logout,
  resetPassword,
  sendSignUpOtp,
  signup,
} from "../controllers/auth.controller.js";
import { simpleSignup } from "../controllers/auth.controller.simple.js";
import { isLoggedIn } from "../middleware/auth.middlerware.js";

const router = new Router();

// Simple signup (no OTP)
router.post("/signup", simpleSignup);

// OTP-based signup flow
router.post("/signupOtpSend", sendSignUpOtp);
router.post("/signupVerify", signup);

router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", isLoggedIn, getProfile);
router.get("/me", isLoggedIn, getProfile);
router.get("/updateSession", isLoggedIn, getProfile);
router.post("/password/forgot", forgotPassword);
router.post("/password/reset/:token", resetPassword);

export default router;
