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

export const createPost = (req, res) => {
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
