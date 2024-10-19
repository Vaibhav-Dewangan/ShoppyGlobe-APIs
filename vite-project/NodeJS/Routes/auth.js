import express from 'express';
import { register, login } from '../Controllers/authController.js';

const router = express.Router();

// Route to register a new user
router.post('/register', register);

// Route to login and get a JWT token
router.post('/login', login);

export default router;