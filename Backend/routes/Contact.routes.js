import { Router } from "express";
import {
  sendContact,
  getAllContacts,
  markAsRead,
} from "../controllers/Contact.controller.js";
import { protect } from "../middleware/Auth.middleware.js";

const router = Router();
router.post("/", sendContact);
router.get("/", protect, getAllContacts);
router.patch("/:id/read", protect, markAsRead);
export default router;
