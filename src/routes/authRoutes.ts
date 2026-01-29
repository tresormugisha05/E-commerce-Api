import { Router } from "express";
import { authorizeRoles } from "../middleware/authorize";
import {
  register,
  login,
  getProfile,
  resetPassword,
  forgotPassword,
  AllUsers,
  deleteusers,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/",protect,authorizeRoles("admin"),AllUsers)
router.get("/profile", protect, getProfile);
router.delete("/",
  protect,
  authorizeRoles("admin"),
  deleteusers)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
export default router;
