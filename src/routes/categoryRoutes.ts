import { Router } from 'express';
import { getCategories, createCategory, deleteCategory } from '../controllers/categoryController';
import { protect } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/authorize';
const router = Router();

router.get('/', getCategories);
router.post("/", protect, authorizeRoles("admin"), createCategory);
router.delete("/:id", protect, authorizeRoles("admin"), deleteCategory);
export default router;