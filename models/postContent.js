import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  body: String,
  name: String,
  videoLink: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  comments: {
    type: [String],
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostContent = mongoose.model('PostContent', postSchema);

export default PostContent;
