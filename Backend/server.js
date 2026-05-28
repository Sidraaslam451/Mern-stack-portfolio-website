import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import path from "path";

import AuthRoutes from "./routes/Auth.routes.js";
import ProjectRoutes from "./routes/Project.routes.js";
import BlogRoutes from "./routes/Blog.routes.js";
import ContactRoutes from "./routes/Contact.routes.js";
import ResumeRoutes from "./routes/Resume.routes.js";
import TestimonialRoutes from "./routes/Testimonial.routes.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

// ===== 100% FAVICON FIX STARTED =====
app.get('/Favicon.png', (req, res) => res.status(204).end());
app.get('/Favicon.png', (req, res) => res.status(204).end());
// ===== 100% FAVICON FIX ENDED =====

const PORT = process.env.PORT || 5000;

// Agar ES Modules use kar rahi hain to public folder ko aise serve karein:
app.use(express.static("public"));

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "https://your-portfolio.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
});
app.use(limiter);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio Backend API chal raha hai! 🚀",
    version: "1.0.0",
  });
});

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/projects", ProjectRoutes);
app.use("/api/blogs", BlogRoutes);
app.use("/api/contacts", ContactRoutes);
app.use("/api/resume", ResumeRoutes);
app.use("/api/testimonials", TestimonialRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} nahi mila. Sahi URL check karo.`,
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Full Error:", err);
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server mein kuch gadbad ho gayi!",
    // Development mein stack trace dikhao, production mein mat dikhao
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB se connected ho gaya!");

    app.listen(PORT, () => {
      console.log(`🚀 Server chal raha hai: http://localhost:${PORT}`);
      console.log(`📱 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connect nahi hua:", error.message);
    // Server start hi mat karo agar DB fail ho
    process.exit(1);
  }
};
startServer();

export default app;