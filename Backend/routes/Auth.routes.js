import { Router } from "express";
import { register, login, getMe } from "../controllers/Auth.controller.js";
import { protect } from "../middleware/Auth.middleware.js";
 
const router = Router();
 
// POST /api/auth/register
router.post("/register", register);
 
// POST /api/auth/login
router.post("/login", login);
 
// GET /api/auth/me — protect middleware pehle chalta hai
router.get("/me", protect, getMe);
 
export default router;