import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import path from "path";

// add the dotenv configuration
dotenv.config();

// connect MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

// directory path
const __dirname = path.resolve();

// create your application
const app = express();

// allows json as the input of the backend
app.use(express.json());

// initialize the cookie parser
app.use(cookieParser());

// Listen to a port
app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

// Add API for get request
// Best Method after creating a route folder and file for user
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// specify the static folder
app.use(express.static(path.join(__dirname, "/client/dist")));

api.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Adding middleware
app.use((err, req, res, next) => {
  // add statusCode
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
