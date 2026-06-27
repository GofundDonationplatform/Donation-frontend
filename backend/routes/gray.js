// routes/gray.js
import express from "express";
import Transaction from "../models/Transaction.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// -------------------------
// File upload setup
// -------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/receipts";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// -------------------------
// Initiate Gray Payment
// -------------------------
router.post("/initiate", async (req, res) => {
  try {
    const { name, email, amount } = req.body;

    if (!amount) return res.status(400).json({ error: "Amount required" });

    const tx_ref = "GRAY_" + Date.now(); // unique reference for Gray

    const transaction = await Transaction.create({
      name: name || "Anonymous",
      email: email || "donor@example.com",
      amount,
      method: "gray",
      tx_ref,
      status: "pending",
    });

    // Payment directions (can be any instructions you want)
    const directions = `
      Please transfer ${amount} USD to:
      Bank: Grey Bank
      Account Name: Gray Business transactiin
      Account Number: 1234567890
    `;

    res.json({
      transactionId: transaction._id,
      tx_ref,
      directions,
      message: "Follow the instructions to complete payment, then confirm below.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gray payment initiation failed" });
  }
});

// -------------------------
// Confirm Gray Payment
// -------------------------
router.post("/confirm/:transactionId", upload.single("receipt"), async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) return res.status(404).json({ error: "transaction not found" });

    transaction.status = "completed"; // mark as paid
    if (req.file) ditransaction.receiptUrl = req.file.path; // save uploaded receipt path

    await transaction.save();

    res.json({ message: "transactiin confirmed successfully!", transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gray payment confirmation failed" });
  }
});

export default router;
