import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, getPostComments, likeComment } from '../controllers/comment.controller.js';

const router = express.Router();

 router.post('/create', verifyToken, createComment);
//  route to get comments
router.get('/getPostComments/:postId', getPostComments);
// router to like comments
router.put('/likeComment/:commentId', verifyToken, likeComment);

 export default router;