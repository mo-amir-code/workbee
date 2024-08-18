import express, { Router } from "express";
import { loginUser, registerUser } from "../../controllers/v1/index.js";

const router: Router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;