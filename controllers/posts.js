import mongoose from 'mongoose';

import PostContent from '../models/postContent.js';

// Fetch all posts
export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    // Pagination boundaries.
    // How many do we want per Page
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;
    // Count the total number of posts in entirety of MongoDB
    const total = await PostContent.countDocuments({});
    // Posts will be sorted by newest to oldest.
    const posts = await PostContent.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i'); // Ignores all cases.
    const posts = await PostContent.find({ title });
    if (posts.length > 0) {
      res.status(200).json({ posts });
    } else {
      res.status(200).json({ message: 'No Results' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getPostsBySearch', error });
  }
};

// Fetch a single post
export const getSinglePost = async (req, res) => {
  try {
    const post = await PostContent.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostContent({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

// Update a Post
export const updatePost = async (req, res) => {
  // Get the ID
  const { id: _id } = req.params;

  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('There are no blogs with that ID');
  }

  const updatedPost = await PostContent.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true },
  );

  res.json(updatedPost);
};

// Delete A Post
export const deletePost = async (req, res) => {
  // Get the ID
  const { id } = req.params;

  // Make sure that given ID is valid like updatePost.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that id...');
  }

  // Don't need data back. If Id exists, it's deleted.
  const deletedToken = await PostContent.findByIdAndRemove(id);

  res.json(deletedToken, { message: 'Posts Deleted Successfully' });
};

// Like a Post
export const likePost = async (req, res) => {
  const { id } = req.params;

  // Req.userId is defined at middleware auth, at routes/posts
  if (!req.userId) {
    // If not defined, then user unauthenticated.
    return res.json({ message: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that id...');
  }
  // Get the post
  const post = await PostContent.findById(id);

  // LOGIC. If already liked, we are going unlike. Vice versa.
  // Check if the person already liked the post.
  const index = post.likes.findIndex((id) => {
    id === String(req.userId);
  });

  if (index === -1) {
    // Like the post
    post.likes.push(req.userId);
  } else {
    // Unlike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostContent.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
