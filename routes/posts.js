import express from 'express';

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/posts.js';

// Auth Middleware
// Auth is applied for creating Post.
// import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);

router.post('/', createPost);

router.patch('/:id', updatePost);

router.delete('/:id', deletePost);

// router.patch('/:id/likePost', auth, likePost);

export default router;
