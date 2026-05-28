import { Router } from "express";
import { getAllProjects, getProject, createProject, updateProject, deleteProject } from "../controllers/Project.controller.js";
import { protect } from "../middleware/Auth.middleware.js";
 
const router = Router();
router.get("/", getAllProjects);
router.get("/:id", getProject);
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);
export default router;
 