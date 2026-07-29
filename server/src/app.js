import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config/index.js";
import logger from "./utils/logger.js";
import errorHandler from "./middleware/errorHandler.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import connectDB from "./config/database.js";

const app = express();


// ======================
// CORS CONFIG (FIXED)
// ======================
app.use(
  cors({
    origin: config.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);




// ======================
//  MIDDLEWARE
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


// ======================
//  DATABASE CONNECTION
connectDB();


// ======================
//  REQUEST LOGGER
// ======================
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});


// =====================
// ROUTES
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/webhooks", webhookRoutes);


// ======================
//  HEALTH CHECK
// ======================
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});


// ======================
// ERROR HANDLER (LAST)
// ======================
app.use(errorHandler);


export default app;