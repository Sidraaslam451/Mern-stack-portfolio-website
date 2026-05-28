import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Naam zaroori hai"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email zaroori hai"],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, "Subject zaroori hai"],
    },
    message: {
      type: String,
      required: [true, "Message zaroori hai"],
      maxlength: [1000, "Message 1000 chars se zyada nahi"],
    },
    isRead: {
      type: Boolean,
      default: false, 
    },
    ipAddress: {
      type: String, 
    },
  },
  { timestamps: true }
);
 
export const Contact = mongoose.model("Contact", contactSchema);