import { Router } from "express";
import {
  NewOrder,
  updateOrder,
  DeleteOrder,
  getUserOrders,
  cancelOrder,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/orders.controller";
import { protect } from "../middleware/authMiddleware";

const app = Router();
app.post("/", NewOrder);
app.get("/", getAllOrders);
app.get("/user", protect, getUserOrders);
app.put("/:orderId", updateOrder);
app.patch("/:orderId/cancel", protect, cancelOrder);
app.patch("/:orderId/status", updateOrderStatus);
app.delete("/:orderId", DeleteOrder);
export default app;
