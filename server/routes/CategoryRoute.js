import { Router } from "express";
import {
  allCats,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/CatController.js";
import { isAdmin, protect } from "../middlewares/checkValidity.js";

const router = Router();

router.get("/all", allCats);
router.get("/all-cats", protect, isAdmin, allCats);
router.post("/create", protect, isAdmin, createCategory);
router.put("/edit", protect, isAdmin, updateCategory);
router.post("/delete", protect, isAdmin, deleteCategory);

export default router;
