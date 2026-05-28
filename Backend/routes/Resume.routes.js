import { Router } from "express";
import { trackDownload, getDownloadStats } from "../controllers/Resume.controller.js";
import { protect } from "../middleware/Auth.middleware.js";
 
const router = Router();
router.post("/download", trackDownload);
router.get("/stats", protect, getDownloadStats);
export default router;
 