import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  breed: String,
  dogSize: String,
  description: String,
  video: String,
  creator: String,
  steps: [String],
  tags: [String],
  image: {
    before: String,
    after: String,
  },
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
