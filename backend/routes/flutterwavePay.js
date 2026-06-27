import express from "express";
import axios from "axios";
import Transaction from "../models/Transaction.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const genRef = () =>
  "tx_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);

router.post("/", async (req, res) => {
  try {
    const { name, email, amount, currency } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (!process.env.FLW_SECRET_KEY) {
      return res.status(500).json({ error: "Missing Flutterwave secret key" });
    }

    const tx_ref = genRef();

    await Transaction.create({
      name: name || "Anonymous",
      email: email || "donor@example.com",
      amount,
      currency: currency || "NGN",
      tx_ref,
      status: "pending",
    });

    const payload = {
      tx_ref,
      amount,
      currency: currency || "NGN",
      redirect_url:
        (process.env.FRONTEND_URL || "").replace(/\/$/, "") +
        "/donate-success",
      customer: {
        email: email || "donor@example.com",
        name: name || "Anonymous Donor",
      },
      payment_options: "card",
      customizations: {
        title: "GFSSGA Digital Service Access",
        description: "Support our cause",
      },
    };

    const resp = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (resp.data?.status === "success") {
      return res.json({ link: resp.data.data.link, tx_ref });
    }

    console.error("FLW FAILED:", resp.data);
    return res.status(500).json({ error: "Flutterwave init failed" });
  } catch (err) {
    console.error("FW ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Server error initializing payment" });
  }
});

export default router;
