import { Router } from "express";
import { authorizeRoles } from "../middleware/authorize";
import {
  register,
  login,
  getProfile,
  changePassword,
  AllUsers,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/",protect,authorizeRoles("admin"),AllUsers)
router.get("/profile", protect, getProfile);
router.put("/change-password", protect, changePassword);

export default router;
