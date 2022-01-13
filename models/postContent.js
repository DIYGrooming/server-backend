import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  breed: String,
  dogSize: String,
  description: String,
  video: String,
  username: String,
  steps: [Object],
  tools: [String],
  duration: String,
  image: {
    before: String,
    after: String,
  },
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
