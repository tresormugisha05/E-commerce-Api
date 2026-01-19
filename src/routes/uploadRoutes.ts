import { Router } from "express";
import { upload } from "../utils/multer.config";
import { uploadSingleFile } from "../controllers/upload.controller";
import { protect } from "../middleware/authMiddleware";
const router = Router();
router.post("/single", protect, upload.single("image"), uploadSingleFile);

export default router;
