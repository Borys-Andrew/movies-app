import { Schema, model } from 'mongoose';

const userSchema = Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Invalid email format',
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  favorites: {
    type: [String],
    default: [],
  },
});

const User = model('user', userSchema);

export default User;
