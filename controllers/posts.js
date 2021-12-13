import mongoose from 'mongoose';

import PostContent from '../models/postContent.js';

export const getPosts = async (req, res) => {
  try {
    const postContent = await PostContent.find();

    console.log(postContent);

    res.status(200).json(postContent);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  // const newPost = new PostContent({
  //   ...post,
  //   creator: req.userId,
  //   createdAt: new Date().toISOString(),
  // });

  const newPost = new PostContent(post);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const updatePost = async (req, res) => {
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
