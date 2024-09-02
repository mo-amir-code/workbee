import express, { Router } from "express";
import authRoutes from "./auth.routes.js";
import taskRoutes from "./task.routes.js";
import userRoutes from "./user.routes.js";
import categoryRoutes from "./category.routes.js";
import { isUserAuthenticated } from "../../middlewares/index.js";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/task", taskRoutes);
router.use("/user", isUserAuthenticated, userRoutes);
router.use("/category", categoryRoutes);

export default router;
