import express from "express";
import Transaction from "../models/Transaction.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", express.json(), async (req, res) => {
  try {
    const signature = req.headers["verif-hash"];
    const secret = process.env.FLW_WEBHOOK_SECRET;

    if (!secret || signature !== secret) {
      return res.status(401).json({ received: false });
    }

    const data = req.body.data || req.body;
    const tx_ref = data.tx_ref;
    const status = (data.status || "").toLowerCase();

    if (!tx_ref) return res.status(400).json({ received: false, reason: "missing_tx_ref" });

    if (status === "successful") {
      await Transaction.findOneAndUpdate({ tx_ref }, { status: "successful" });
    } else if (status === "failed") {
      await Transaction.findOneAndUpdate({ tx_ref }, { status: "failed" });
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(500).json({ received: false });
  }
});

export default router;
