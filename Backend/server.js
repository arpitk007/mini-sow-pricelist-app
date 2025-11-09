import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Mini SOW Backend Running Successfully!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
