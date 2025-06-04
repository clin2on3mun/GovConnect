import { Router } from 'express';
import { getCategories } from '../controller/categoryController';
import { protect } from '../middleware/middleware';

const router = Router();

router.get('/', protect, getCategories);

export default router;
