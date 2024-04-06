import express from "express";
import { deleteUser, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
// route to update the user
router.put('/update/:userId', verifyToken,updateUser);
// route to delete the user
router.delete('/delete/:userId', verifyToken, deleteUser);

export default router;
