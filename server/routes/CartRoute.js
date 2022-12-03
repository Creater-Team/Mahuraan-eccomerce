import { Router } from "express";
import {
  addToCart,
  decrementItem,
  deleteItem,
  emptyMyCart,
  getMyCart,
} from "../controllers/cartController.js";
import { isAdmin, protect } from "../middlewares/checkValidity.js";
const router = Router();

router.post("/addtocart", protect, addToCart);
router.get("/mycart", protect, getMyCart);
router.post("/emptycart", protect, emptyMyCart);
router.post("/deleteitem", protect, deleteItem);
router.post("/updateitem", protect, decrementItem);

export default router;
