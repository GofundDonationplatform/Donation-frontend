// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Routes
import paystackRoutes from "./routes/paystackRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import flutterwavePay from "./routes/flutterwavePay.js";
import flutterwaveWebhook from "./routes/flutterwaveWebhook.js";
import grayRoutes from "./routes/gray.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err));


// Routes
app.use("/api/paystack", paystackRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/donate", flutterwavePay);
app.use("/api/webhook/flutterwave", flutterwaveWebhook);
app.use("/api/gray", grayRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/campaigns", campaignRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/donations", donationRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("GoFundSS Backend is running ✅");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
