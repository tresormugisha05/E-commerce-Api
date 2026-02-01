"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const multer_config_1 = require("../config/multer.config");
const router = (0, express_1.Router)();
// Dashboard (no auth for testing)
router.get("/stats", adminController_1.getDashboardStats);
router.get("/analytics", adminController_1.getAnalytics);
// Orders (no auth for testing)
router.get("/orders", adminController_1.getAdminOrders);
// Products (no auth for testing)
router.get("/products/top", adminController_1.getTopProducts);
// Customers (no auth for testing)
router.get("/customers", adminController_1.getCustomers);
// Campaigns (no auth for testing)
router.get("/campaigns", adminController_1.getCampaigns);
router.post("/campaigns", adminController_1.addCampaign);
// Products (no auth for testing)
router.post("/products", multer_config_1.upload.array("images", 4), adminController_1.createAdminProduct);
// Protected routes (with auth)
// router.use(protect);
// router.use(authorizeRoles("admin", "manager", "support"));
exports.default = router;
