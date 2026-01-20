import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { protect } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorize";
import { upload } from "../config/multer.config";

const router = Router();

router.get("/", getProducts);
router.post(
  "/",
  protect,
  upload.array("images", 4),
  authorizeRoles("vendor", "admin"),
  createProduct,
);
router.put("/:id", protect, authorizeRoles("vendor", "admin"), updateProduct);
router.delete(
  "/:id",
  protect,
  authorizeRoles("vendor", "admin"),
  deleteProduct,
);

export default router;
