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
import campaignUpdateRoutes from "./routes/campaignUpdateRoutes.js";
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
app.use("/api/campaign-updates", campaignUpdateRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/donations", donationRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("GoFundSS Backend is running ✅");
});

// Start server

app.get("/sync-admin", async (req, res) => {
  try {
    const User = (await import("./models/User.js")).default;

    const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || "Admin";

    let admin = await User.findOne({ email });

    if (admin) {
      admin.name = name;
      admin.password = password;
      admin.isAdmin = true;
      await admin.save();

      return res.json({
        success: true,
        action: "updated",
        email: admin.email,
      });
    }

    admin = await User.create({
      name,
      email,
      password,
      isAdmin: true,
    });

    res.json({
      success: true,
      action: "created",
      email: admin.email,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
});
