import express from 'express';
import { resetAndSeed } from '../controllers/seed.controller';
import { authenticateApiKey } from '../middlewares/auth'

const router = express.Router();
router.post('/', authenticateApiKey, resetAndSeed);
export default router;
