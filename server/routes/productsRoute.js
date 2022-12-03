import { Router } from "express";
import {
  createProduct,
  deleteItem,
  getCats,
  getOneProduct,
  getProducts,
  getReviewsOfProduct,
  updateProduct,
} from "../controllers/productControllers.js";
const router = Router();
import { protect, isAdmin } from "../middlewares/checkValidity.js";
import upload from "../utils/config/multer.js";

router.get("/all", getProducts);
router.get("/:id", getOneProduct);
router.get("/reviews/:id", getReviewsOfProduct);
router.post(
  "/admin/create",
  protect,
  isAdmin,
  upload.single("image"),
  createProduct
);
router.get("/admin/cats", protect, isAdmin, getCats);

router.put(
  "/admin/edit/:id",
  protect,
  isAdmin,
  upload.single("image"),
  updateProduct
);

router.post("/admin/delete", protect, isAdmin, deleteItem);

export default router;
