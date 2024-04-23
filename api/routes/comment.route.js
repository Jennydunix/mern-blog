import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, deleteComment, editComment,getcomments,getPostComments, likeComment } from '../controllers/comment.controller.js';

const router = express.Router();

 router.post('/create', verifyToken, createComment);
//  route to get post comments
router.get('/getPostComments/:postId', getPostComments);
// router to like comments
router.put('/likeComment/:commentId', verifyToken, likeComment);
// router to edit comments
router.put('/editComment/:commentId', verifyToken, editComment);
// router to delete comments
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
// route to get comments
router.get('/getcomments', verifyToken, getcomments);


 export default router;