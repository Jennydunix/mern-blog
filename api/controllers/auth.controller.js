import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
   next(errorHandler(400, 'All fields are required'));
  }

    // hash password
    const hashPassword = bcryptjs.hashSync(password, 10);

  // create new user
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  // sending error to user when username and email are used already
  try {
    // save them inside the database
    await newUser.save();
    // create a response to check the status;
    res.json("Signup successful");
  } catch (err) {
    next(err);
  }
};
