import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Anonymous" },
    email: { type: String, default: "donor@example.com" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },

    campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
  },

    tx_ref: { type: String, required: true, unique: true },

    status: {
      type: String,
      enum: ["pending", "completed", "rejected"],
      default: "pending",
    },

    method: {
      type: String,
      enum: ["flutterwave", "paystack", "paypal", "dodopay", "gray"],
      default: "flutterwave",
    },

    flw_id: { type: String }, // keep for Flutterwave
    meta: { type: Object },

    // For Gray Business only
    receiptUrl: { type: String }, // optional upload
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
