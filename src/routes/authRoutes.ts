import { Router } from "express";
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
router.get("/",AllUsers)
router.get("/profile", protect, getProfile);
router.put("/change-password", protect, changePassword);

export default router;
