import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, editComment, getPostComments, likeComment } from '../controllers/comment.controller.js';

const router = express.Router();

 router.post('/create', verifyToken, createComment);
//  route to get comments
router.get('/getPostComments/:postId', getPostComments);
// router to like comments
router.put('/likeComment/:commentId', verifyToken, likeComment);
// router to edit comments
router.put('/editComment/:commentId', verifyToken, editComment);

 export default router;