import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts, updatepost,  } from '../controllers/post.controllers.js';

// create a router based on express
const router = express.Router();

// create a post request
router.post('/create', verifyToken, create);
// create get post api route
router.get('/getposts', getposts);
// create a delete request
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);
// update a post api route
router.put('/updatepost/:postId/:userId', verifyToken, updatepost );

export default router;