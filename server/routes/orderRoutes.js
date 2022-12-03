import { Router } from "express";
import {
  allOrders,
  createOrder,
  deliveredOrders,
  findOrder,
  getOrder,
  payOrder,
  setOrderToDelivery,
  unDelivered,
} from "../controllers/orderController.js";
import { isAdmin, protect } from "../middlewares/checkValidity.js";

const router = Router();

router.get("/all", protect, isAdmin, allOrders);
router.post("/create", protect, createOrder);
router.post("/pay-order", protect, payOrder);
router.get("/find-order/:id", protect, findOrder);
router.get("/find-delivered", protect, isAdmin, deliveredOrders);
router.get("/find-undelivered", protect, isAdmin, unDelivered);
router.get(`/admin/get-order/:id`, protect, isAdmin, getOrder);
router.put(`/admin/edit-order/:id`, protect, isAdmin, setOrderToDelivery);

export default router;
