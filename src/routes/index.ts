import express from 'express';
import { temperature, user } from '../controllers';

const router = express.Router();

router.get('/', user);

router.get('/temperature', temperature);

export default router;
