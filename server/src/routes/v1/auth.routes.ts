import express, { Router } from "express";
import {
  loginUser,
  registerUser,
  sendOTP,
  verifyOTP,
} from "../../controllers/v1/index.js";

const router: Router = express.Router();

router.post("/register", registerUser, sendOTP);
router.post("/verify", verifyOTP);
router.post("/login", loginUser);

export default router;
