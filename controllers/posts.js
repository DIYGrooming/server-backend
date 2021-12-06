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
