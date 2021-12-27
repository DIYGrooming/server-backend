import express from 'express';

import {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/posts.js';

// Auth Middleware
// Auth is applied for creating Post.
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);

router.get('/:id', getSinglePost);

router.post('/', auth, createPost);

router.patch('/:id', auth, updatePost);

router.delete('/:id', auth, deletePost);

router.patch('/:id/likePost', auth, likePost);

export default router;
