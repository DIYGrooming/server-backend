// Express
import express from 'express';
const router = express.Router();

// Controllers
import { signin, signup } from '../controllers/user.js';

router.post('/signin', signin);
router.post('/signup', signup);

export default router;
