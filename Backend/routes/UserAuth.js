import express from 'express';
import { LoginController, RegisterController } from '../controllers/AuthController.js';
import { signInValidation, signUpValidation } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', signUpValidation, RegisterController);
router.post('/login', signInValidation, LoginController);


export default router;