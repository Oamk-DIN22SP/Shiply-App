// src/routes/authRoutes.ts
import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { Auth } from 'firebase-admin/lib/auth/auth';

const router = Router();

router.post('/login', AuthController.authenticateUser);
router.post('/signup', AuthController.signUpUser)
export default router;
