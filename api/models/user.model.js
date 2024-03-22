import mongoose from "mongoose";

// create userSchema - rules and conditions for the user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true});

// Create user
const User = mongoose.model('User', userSchema);

export default User;