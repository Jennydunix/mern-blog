import express from "express";
import { deleteUser, getUser, getUsers, signout, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
// route to update the user
router.put('/update/:userId', verifyToken,updateUser);
// route to delete the user
router.delete('/delete/:userId', verifyToken, deleteUser);
// route to sign out user
router.post('/signout', signout);
// route to get users
router.get('/getusers', verifyToken, getUsers)
// route for public users
router.get('/:userId', getUser);

export default router;
