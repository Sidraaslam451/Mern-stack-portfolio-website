import { Router } from "express";
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "../controllers/Testimonial.controller.js";
import { protect } from "../middleware/Auth.middleware.js";

const router = Router();

router.get("/", getAllTestimonials);
router.post("/", protect, createTestimonial);
router.put("/:id", protect, updateTestimonial);
router.delete("/:id", protect, deleteTestimonial);

export default router;