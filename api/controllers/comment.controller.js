import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

// get comments
export const getPostComments = async (req, res, next) => {
  try {
    // get the comments and sort based on the newest comment
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// like comments
export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if(!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    // check if the user likes the comment
    const userIndex = comment.likes.indexOf(req.user.id);
    // if the user is not avaailable
    if(userIndex === -1) {
      // add user inside the likes array
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else{
      // remove the user from the likes array
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    // save comment
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

// edit comments
export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to edit this comment'));
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment)
  } catch (error) {
    next(error);
  }
}

// delete comment
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if(!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    if(comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete this comment'));
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json('Comment has been deleted');
  } catch (error) {
    next(error);
  }
}