import { Router } from 'express';
import { login, signUp } from '../controller/authController';
import { protect } from '../middleware/middleware';
import { findSubmission } from '../controller/submissionController';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/:user/submissions', protect, findSubmission);

export default router;
