import express, { Router } from "express";
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
  sendOTP,
  verifyOTP,
} from "../../controllers/v1/index.js";

const router: Router = express.Router();

router.post("/register", registerUser, sendOTP);
router.post("/verify", verifyOTP);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword, sendOTP);
router.post("/reset-password", resetPassword);

export default router;
