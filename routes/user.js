// Express
import express from 'express';
const router = express.Router();

// Controllers
import {
  signin,
  signup,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from '../controllers/user.js';

// Middleware
import auth from '../middleware/auth.js';

// User Sign in and sign up routes.
router.post('/signin', signin);
router.post('/signup', signup);

// User Profile Routes
router.get('/', getUsers);

router.get('/:id', getSingleUser);

router.patch('/:id', auth, updateUser);

router.delete('/:id', auth, deleteUser);

export default router;
