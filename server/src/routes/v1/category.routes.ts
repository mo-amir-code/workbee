import express, { Router } from "express";
import { createCategory } from "../../controllers/v1/index.js";

const router: Router = express.Router();

router.post("/", createCategory);

export default router;
