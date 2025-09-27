import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import todoRoutes from "./src/routes/todo.routes.js";

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/todos", todoRoutes);

// connect DB & start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

  
console.log("DEBUG ENV:", process.env); // in tất cả biến môi trường
console.log("DEBUG MONGO_URI:", process.env.MONGO_URI); // in riêng MONGO_URI