import { Router } from "express";
import {
  allUsers,
  createReview,
  updateUser,
  userFunction,
} from "../controllers/usersController.js";
import { protect, isAdmin } from "../middlewares/checkValidity.js";
const router = Router();

router.post("/login", userFunction);
router.post("/addreview", protect, createReview);
router.get("/all", protect, isAdmin, allUsers);
router.put("/edit", protect, isAdmin, updateUser);

export default router;
