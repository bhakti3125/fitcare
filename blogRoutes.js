import express from "express";
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:slugOrId", getBlog);

router.post("/", createBlog);
router.put("/:id", verifyToken, updateBlog);
router.delete("/:id", verifyToken, deleteBlog);

export default router;