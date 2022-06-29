import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../Controllers/UserController.js";
import authMiddleWare from "../Middleware/authMiddleware.js";
const router = express.Router();

//route for getting all users
router.get("/", getAllUser);
//route for getting a users
router.get("/:id", getUser);
//route for update user
router.put("/:id", authMiddleWare, updateUser);
//route for deleting users
router.delete("/:id", authMiddleWare, deleteUser);

export default router;
