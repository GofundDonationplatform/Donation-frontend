// models/Donation.js
import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    tx_ref: { type: String, required: true, index: true },
    flw_id: { type: String }, // Flutterwave transaction id (if available)
    status: { type: String, enum: ["pending", "successful", "failed"], default: "pending" },
    meta: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
