import { Router } from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  getCartByName,
  clearSpecificCart,
} from "../controllers/cartController";

const router = Router();

router.get("/", getCart);
router.get("/:cartName", getCartByName);
router.post("/", addToCart);
router.delete("/", removeFromCart);
router.delete("/clear", clearSpecificCart);

export default router;
