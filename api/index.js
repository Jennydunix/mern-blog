import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';

// add the dotenv configuration
dotenv.config();

// connect MongoDB
mongoose
  .connect(
    process.env.MONGO
  )
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

// create your application
const app = express();

// Listen to a port
app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

// Add API for get request
// Best Method after creating a route folder and file for user
app.use('/api/user', userRoutes);

