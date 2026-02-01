import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorize";
import {
  getDashboardStats,
  getAdminOrders,
  getTopProducts,
  getCustomers,
  getCampaigns,
  addCampaign,
  getAnalytics,
  createAdminProduct
} from "../controllers/adminController";
import { upload } from "../config/multer.config";

const router = Router();

// Dashboard (no auth for testing)
router.get("/stats", getDashboardStats);
router.get("/analytics", getAnalytics);

// Orders (no auth for testing)
router.get("/orders", getAdminOrders);

// Products (no auth for testing)
router.get("/products/top", getTopProducts);

// Customers (no auth for testing)
router.get("/customers", getCustomers);

// Campaigns (no auth for testing)
router.get("/campaigns", getCampaigns);
router.post("/campaigns", addCampaign);

// Products (no auth for testing)
router.post("/products", upload.array("images", 4), createAdminProduct);

// Protected routes (with auth)
// router.use(protect);
// router.use(authorizeRoles("admin", "manager", "support"));

export default router;