import { Router } from "express";
import {
  chartInfo,
  getInfo,
} from "../../controllers/DashboardControllers/DashboardController.js";
const router = Router();

router.get("/", getInfo);
router.get("/chart", chartInfo);

export default router;
