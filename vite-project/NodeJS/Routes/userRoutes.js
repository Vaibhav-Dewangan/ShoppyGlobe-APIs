import express from 'express';
import { getUserById , getUsers } from '../Controllers/userController.js';


const router = express.Router();

// Fetch user data
router.get('/', getUsers);

// Fetch user data by id
router.get('/:email', getUserById);

export default router;

