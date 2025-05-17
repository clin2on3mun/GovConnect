import { Router } from 'express';
import { protect } from '../middleware/middleware';
import { createSubmission } from '../controller/submissionController';

const router = Router();

router.use(protect);
router.route('/').post(createSubmission);

export default router;
