import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  // Need at sign up page
  id: { type: String },
  username: { type: String, required: true },
  proGroomer: { type: Boolean, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },

  // Add later in Profile page.
  bio: { type: String },
  website: { type: String },
  socMedia: { type: String },
  avatar: { type: String },

  // Arrays and data
  posts: {
    type: [String],
    default: [],
  },

  postsLiked: {
    type: [String],
    default: [],
  },

  postsCommented: {
    type: [String],
    default: [],
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model('User', userSchema);
export default User;
