import express, { Router } from "express";
import { createTask } from "../../controllers/v1/index.js";

const router: Router = express.Router();

router.post("/task", createTask);

export default router;
