import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Naam zaroori hai"],
    },
    position: {
      type: String, 
      required: true,
    },
    company: String,
    avatar: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      required: [true, "Testimonial message zaroori hai"],
      maxlength: [300, "Message 300 chars se zyada nahi"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
 
export const Testimonial = mongoose.model("Testimonial", testimonialSchema);