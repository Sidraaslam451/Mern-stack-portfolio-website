import { Router } from "express";
import { trackDownload, getDownloadStats } from "../controllers/resume.controller.js";
import { protect } from "../middleware/auth.middleware.js";
 
const router = Router();
router.post("/download", trackDownload);
router.get("/stats", protect, getDownloadStats);
export default router;
 