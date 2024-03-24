import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

    // hash password
    const hashPassword = bcryptjs.hashSync(password, 10);

  // create new user
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  // sending error to user when username and password are used already
  try {
    // save them inside the database
    await newUser.save();
    // create a response to check the status;
    res.json("Signup successful");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
