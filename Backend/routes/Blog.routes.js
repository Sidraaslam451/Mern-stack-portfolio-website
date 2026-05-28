import { Router } from "express";
import { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog, getAllBlogsAdmin } from "../controllers/Blog.controller.js";
import { protect } from "../middleware/Auth.middleware.js";
 
const router = Router();
router.get("/", getAllBlogs);
router.get("/admin/all", protect, getAllBlogsAdmin);
router.get("/:slug", getBlog);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);
export default router;