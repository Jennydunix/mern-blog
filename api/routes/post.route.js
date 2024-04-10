import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getposts } from '../controllers/post.controllers.js';

// create a router based on express
const router = express.Router();

// create a post request
router.post('/create', verifyToken, create);
// create get post api route
router.get('/getposts', getposts);

export default router;