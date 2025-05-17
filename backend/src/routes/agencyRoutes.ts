import { Router } from 'express';
import {
  createAgency,
  deleteAgency,
  findAgency,
  findAllAgencies,
  updateAgency,
} from '../controller/agencyController';
import { protect } from '../middleware/middleware';

const router = Router();
router.use(protect);
router.route('/').post(createAgency).get(findAllAgencies);
router.route('/:id').get(findAgency).patch(updateAgency).delete(deleteAgency);

export default router;
