import express from 'express';

import { getPosts, createPost, updatePost } from '../controllers/posts.js';

// Auth Middleware
// Auth is applied for creating Post.
// import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);

router.post('/', createPost);

router.patch('/:id', updatePost);

// router.delete('/:id', auth, deletePost);

// router.patch('/:id/likePost', auth, likePost);

export default router;
