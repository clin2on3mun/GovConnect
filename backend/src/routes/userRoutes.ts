import { Router } from 'express';
import { getUser, login, logOut, signup } from '../controller/userController';
import { protect } from '../middleware/middleware';
import { findSubmission } from '../controller/submissionController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/:user/submissions', protect, findSubmission);
router.post('/logout', logOut);
router.get('/me', protect, getUser);

export default router;
