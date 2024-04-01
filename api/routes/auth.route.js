import express from 'express';
import {google, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

// Define a route to handle HTTP POST requests to the '/signup' endpoint, invoking the 'signup' function
router.post('/signup', signup);
// Define a route to handle HTTP POST requests to the '/signin' endpoint, invoking the 'signin' function
router.post('/signin', signin);
// create post request for google 
router.post('/google', google);


export default router;