import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project ka title zaroori hai"],
      trim: true,
      maxlength: [100, "Title 100 characters se zyada nahi ho sakta"],
    },
    description: {
      type: String,
      required: [true, "Description zaroori hai"],
      maxlength: [500, "Description 500 characters se zyada nahi"],
    },
    techStack: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      enum: ["fullstack", "frontend", "backend", "mobile", "other"],
      default: "fullstack",
    },
    image: {
      type: String,
      default: "",
    },
    liveUrl: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
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
  { timestamps: true },
);

export const Project = mongoose.model("Project", projectSchema);
