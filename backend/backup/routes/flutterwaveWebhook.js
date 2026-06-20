// routes/flutterwaveWebhook.js
import express from "express";
import Donation from "../models/Donation.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", express.json(), async (req, res) => {
  try {
    const signature =
      req.headers["verif-hash"] ||
      req.headers["verif_hash"] ||
      req.headers["x-verif-hash"];
    const secret = process.env.FLW_WEBHOOK_SECRET || process.env.FLW_SECRET_HASH;

    if (!secret) {
      console.warn("⚠️ No FLW_WEBHOOK_SECRET configured, skipping signature check.");
    } else if (signature !== secret) {
      console.warn("🚨 Invalid webhook signature");
      return res.status(401).json({ received: false, reason: "invalid_signature" });
    }

    const payload = req.body;
    console.log("🔔 Flutterwave webhook payload:", payload);

    const data = payload.data || payload;
    const tx_ref = data.tx_ref;
    const status = (data.status || "").toLowerCase();
    const flw_id = data.id || data.flw_ref;

    if (!tx_ref) {
      console.warn("⚠️ webhook missing tx_ref");
      return res.status(400).json({ received: false, reason: "missing_tx_ref" });
    }

    if (["successful", "success", "completed"].includes(status)) {
      const found = await Donation.findOneAndUpdate(
        { tx_ref },
        { status: "successful", flw_id, meta: data },
        { new: true }
      );
      console.log("✅ Donation marked successful:", found?._id?.toString());
    } else if (["failed", "cancelled", "error"].includes(status)) {
      await Donation.findOneAndUpdate({ tx_ref }, { status: "failed", meta: data });
      console.log("⚠️ Donation marked failed:", tx_ref);
    } else {
      console.log("ℹ️ Webhook status:", status, "for", tx_ref);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("🚨 webhook handler error:", err);
    res.status(500).json({ received: false });
  }
});

export default router;
