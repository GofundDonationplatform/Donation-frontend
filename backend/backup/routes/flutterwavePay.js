// routes/flutterwavePay.js
import express from "express";
import axios from "axios";
import Donation from "../models/Donation.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Helper: generate tx_ref
const genRef = () => "tx_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);

// POST /api/donate
// expected body: { name, email, amount, currency?: "USD" }
router.post("/", async (req, res) => {
  try {
    const { name, email, amount, currency = "USD" } = req.body;

    // 🧩 Validate amount
    if (!amount || isNaN(amount) || Number(amount) < 1) {
      return res.status(400).json({ error: "Invalid or missing donation amount" });
    }

    // 🧩 Validate Flutterwave keys
    if (!process.env.FLW_SECRET_KEY) {
      console.error("❌ Missing FLW_SECRET_KEY in .env");
      return res.status(500).json({ error: "Server misconfiguration" });
    }

    const tx_ref = genRef();

    // Save pending donation
    const donation = await Donation.create({
      name: name || "Anonymous",
      email: email || "donor@example.com",
      amount: Number(amount),
      currency,
      tx_ref,
      status: "pending",
    });

    // ✅ Build payload safely
    const payload = {
      tx_ref,
      amount: String(amount),
      currency: currency || "USD",
      redirect_url: `${
        process.env.FRONTEND_URL?.replace(/\/$/, "") || "http://localhost:5173"
      }/donate-success`,
      payment_options: "card",
      customer: {
        email: email || "donor@example.com",
        name: name || "Anonymous Donor",
      },
      customizations: {
        title: "GoFundSS Donation",
        description: `Support a global cause (${tx_ref})`,
        logo: "https://yourfrontend.com/logo.png", // optional
      },
    };

    console.log("🟢 Flutterwave Payload:", payload);

    // ✅ Create payment link via API
    const resp = await axios.post("https://api.flutterwave.com/v3/payments", payload, {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 15000,
    });

    // ✅ Return payment link
    if (resp.data?.status === "success" && resp.data?.data?.link) {
      console.log("✅ Flutterwave Init Success:", resp.data.data.link);
      return res.json({
        link: resp.data.data.link,
        donationId: donation._id,
        tx_ref,
      });
    }

    console.error("⚠️ Flutterwave init failed:", resp.data);
    return res.status(500).json({ error: "Failed to initialize payment" });
  } catch (err) {
    console.error("🚨 /api/donate error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Server error initializing payment" });
  }
});

export default router;
