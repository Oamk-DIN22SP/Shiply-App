// src/routes/authRoutes.ts
import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/login', AuthController.authenticateUser);
router.post('/signup', AuthController.signUpUser)
router.delete('/delete', AuthController.deleteUser)
export default router;
