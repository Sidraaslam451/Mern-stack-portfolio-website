import { Router } from "express";
import {
  sendContact,
  getAllContacts,
  markAsRead,
} from "../controllers/contact.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();
router.post("/", sendContact);
router.get("/", protect, getAllContacts);
router.patch("/:id/read", protect, markAsRead);
export default router;
