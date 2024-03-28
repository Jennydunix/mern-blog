import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
    next(errorHandler(400, "All fields are required"));
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

// create sign in API route
export const signin = async (req, res, next) => {
  // get username and password
  const { email, password } = req.body;

  // check if there's no username or password or both are null state an error if that's the case
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    // Check the password of the user
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    // If both password and user are valid, authenticate the user
    // creating a token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // hide hashed password
    const {password: pass, ...rest} = validUser._doc;
    // add token to cookie
    res.status(200).cookie("access_token", token, {
      httpOnly: true}).json(rest);
  } catch (error) {
    next(error);
  }
};
