import express from 'express';
import { resetAndSeed } from '../controllers/seed.controller';

const router = express.Router();
router.post('/', resetAndSeed);
export default router;
