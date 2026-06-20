// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import fetch from "node-fetch";
import donateRoutes from "./routes/flutterwavePay.js";
import webhookRoutes from "./routes/flutterwaveWebhook.js";
import aiRoutes from "./routes/aiRoutes.js";
import paystackRoutes from "./routes/paystack.js";

dotenv.config();
const app = express();

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());

// === DEBUG LOGGER ===
app.use((req, res, next) => {
  console.log(`🌍 Incoming request: ${req.method} ${req.url}`);
  if (req.method !== "GET" && req.headers["content-type"]?.includes("application/json")) {
    console.log("📦 Body:", req.body);
  }
  next();
});

// === ✅ PAYPAL PAYMENT ROUTES ===

// Generate Access Token
async function generatePayPalAccessToken() {
  try {
    const { PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API } = process.env;
    if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET || !PAYPAL_API) {
      throw new Error("Missing PayPal environment variables!");
    }

    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");

    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    if (!data.access_token) throw new Error("Failed to get PayPal token");
    return data.access_token;
  } catch (err) {
    console.error("❌ PayPal Token Error:", err.message);
    throw err;
  }
}

// Create Order
app.post("/api/paypal/create-order", async (req, res) => {
  try {
    const accessToken = await generatePayPalAccessToken();
    const { amount } = req.body;

    const response = await fetch(`${process.env.PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount || "10.00",
            },
          },
        ],
      }),
    });

    const data = await response.json();
    if (data.id) {
      console.log("✅ PayPal Order Created:", data.id);
      res.json(data);
    } else {
      console.error("❌ PayPal Order Error:", data);
      res.status(500).json({ error: "Failed to create PayPal order", details: data });
    }
  } catch (err) {
    console.error("PayPal create-order error:", err);
    res.status(500).json({ error: "Failed to create PayPal order" });
  }
});

// Capture Payment
app.post("/api/paypal/capture-order/:orderID", async (req, res) => {
  try {
    const accessToken = await generatePayPalAccessToken();
    const { orderID } = req.params;

    const response = await fetch(`${process.env.PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    console.log("✅ PayPal Payment Captured:", data);
    res.json(data);
  } catch (err) {
    console.error("PayPal capture error:", err);
    res.status(500).json({ error: "Failed to capture PayPal payment" });
  }
});

// === EXISTING ROUTES ===
app.use("/api/donate", donateRoutes);
app.use("/api/flutterwave/webhook", webhookRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/paystack", paystackRoutes);

// === TEST ROUTE ===
app.get("/api/test", (req, res) => res.json({ message: "Backend is alive!" }));

// === MONGODB CONNECTION ===
const mongo = process.env.MONGO_URI;
if (!mongo) {
  console.error("❌ MONGO_URI not set in .env");
  process.exit(1);
}

mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// === START SERVER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log("🧩 DEBUG PayPal setup =>", {
    CLIENT_ID: !!process.env.PAYPAL_CLIENT_ID,
    SECRET: !!process.env.PAYPAL_SECRET,
  });
});
