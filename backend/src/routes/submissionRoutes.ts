import { Router } from 'express';
import { protect, restrictTo } from '../middleware/middleware';
import {
  createSubmission,
  deleteSubmission,
  findAllSubmission,
  getSubmission,
  respondToSubmission,
  updateSubmission,
  viewedbyAgent,
} from '../controller/submissionController';

const router = Router();

router.use(protect);
router.route('/').post(createSubmission);
router.get('/:id', restrictTo('guest', 'superadmin') ,getSubmission);

router.delete('/:id', restrictTo('guest', 'superadmin'), deleteSubmission);
router.get('/', restrictTo('superadmin'), findAllSubmission);
router.patch('/:id/respond', restrictTo('agent_admin'), respondToSubmission);
router.patch('/:id', restrictTo('guest'), updateSubmission);
router.patch('/:id/read', restrictTo('agent_admin'), viewedbyAgent);

export default router;
