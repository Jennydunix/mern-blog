import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  // check if the person isAdmin
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  // create a slug for the post
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// get post
export const getposts = async (req, res, next) => {
  try {
    // get a specific number of posts
    const startIndex = parseInt(req.query.startIndex) || 0;
    // set a limit for the number of posts
    const limit = parseInt(req.query.limit) || 9;
    // sort direction(if its 1 mongodb will show ascending else otherwise)
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { category: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
         
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      })
    }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

    // get the total number of posts
    const totalPosts = await Post.countDocuments();

    // get total number of posts in previous month
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    // calculate last month's post
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });

  } catch (error) {
    next(error);
  }
};

