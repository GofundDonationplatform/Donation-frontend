// routes/paystackRoutes.js
import express from "express";
import axios from "axios";
import Transaction from "../models/Transaction.js"; // adjust path if your models folder is elsewhere
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Initialize a Paystack transaction
// Expects: { amount: Number (major units), email: string, name?: string, currency?: 'NGN' }
router.post("/initialize", async (req, res) => {
  try {
    const { amount, email = "donor@example.com", name = "Donor", currency = "NGN" } = req.body;
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) return res.status(500).json({ error: "Paystack secret not configured" });

    // Paystack expects amount in kobo for NGN (multiply by 100). For other currencies, check Paystack docs.
    const payAmount = Math.round(Number(amount) * 100);

    // Generate a unique reference
    const tx_ref = `ps_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // Optional: create a pending Transaction record
    await Transaction.create({
      name,
      email,
      amount: Number(amount),
      currency,
      tx_ref,
      status: "pending",
    });

    const callback_url = `${(process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "")}/donate-success`;

    const body = {
      email,
      amount: payAmount,
      reference: tx_ref,
      callback_url,
    };

    const response = await axios.post("https://api.paystack.co/transaction/initialize", body, {
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
    });

    // Return Paystack's data
    res.json(response.data.data || response.data);
  } catch (err) {
    console.error("Paystack initialize error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to initialize Paystack transaction", details: err.response?.data || err.message });
  }
});

// Verify a transaction by reference (GET /api/paystack/verify?reference=...)
router.get("/verify", async (req, res) => {
  try {
    const { reference } = req.query;
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!reference) return res.status(400).json({ error: "Missing reference" });
    if (!paystackSecret) return res.status(500).json({ error: "Paystack secret not configured" });

    const response = await axios.get(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${paystackSecret}` },
    });

    // If successful, update Transaction status
    const data = response.data?.data;
    if (data && data.status === "success") {
      await Transaction.findOneAndUpdate({ tx_ref: reference }, { status: "successful", meta: data });
    }

    res.json(response.data);
  } catch (err) {
    console.error("Paystack verify error:", err.response?.data || err.message);
    res.status(500).json({ error: "Paystack verify failed", details: err.response?.data || err.message });
  }
});

export default router;
