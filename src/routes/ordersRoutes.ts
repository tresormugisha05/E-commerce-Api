import Router from "express";
import {
  NewOrder,
  updateOrder,
  DeleteOrder,
} from "../controllers/orders.controller";
const app = Router();
app.post("/", NewOrder);
app.put("/:orderId", updateOrder);
app.delete("/:orderId", DeleteOrder);
export default app;
