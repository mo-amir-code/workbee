import express, { Router } from "express";
import authRoutes from "./auth.routes.js";
import taskRoutes from "./task.routes.js"

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/task", taskRoutes);

export default router;
