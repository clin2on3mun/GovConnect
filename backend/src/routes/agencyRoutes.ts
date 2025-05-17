import { Router } from 'express';
import {
  createAgency,
  deleteAgency,
  findAgency,
  findAllAgencies,
  restoreAgency,
  updateAgency,
} from '../controller/agencyController';
import { protect, restrictTo } from '../middleware/middleware';
import { findSubmission } from '../controller/submissionController';

const router = Router();
router.use(protect);

router.get('/', findAllAgencies);
router.post('/', restrictTo('superadmin'), createAgency);
router.route('/:id').get(findAgency).patch(updateAgency);
router.patch('/:id', restrictTo('superadmin'), updateAgency);
router.patch('/:id/deleteAgency', restrictTo('superadmin'), deleteAgency);
router.patch('/:id/restoreAgency', restrictTo('superadmin'), restoreAgency);
router.get('/:agencyId/submissions', protect, findSubmission);
export default router;
