import express, { Router } from "express";
import { filteredTasks, getLatestTasks, getHighestPayingTasks } from "../../controllers/v1/task.controller.js";

const router: Router = express.Router();

router.get("/latest", getLatestTasks);
router.get("/highest-paying", getHighestPayingTasks);
router.get("/filter", filteredTasks);

export default router;
