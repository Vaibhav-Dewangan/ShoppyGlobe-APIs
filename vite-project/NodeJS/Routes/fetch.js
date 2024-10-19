import express from 'express';
import {fetchAPI} from '../Controllers/fetchAPI.js';

const router = express.Router();

// Fetch data from an external API and save to MongoDB
router.post('/fetch-API', fetchAPI);

export default router;

