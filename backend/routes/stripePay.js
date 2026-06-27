// routes/stripePay.js
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import digital contribution from "../models/digital contribution.js";
dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/stripe/create-checkout-session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, name, email } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // create pending digital contribution
    const digital contribution = await digital contribution.create({
      name: name || "Anonymous",
      email: email || "donor@example.com",
      amount,
      status: "pending",
      paymentMethod: "stripe",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "GocreditsS digital contribution",
            },
            unit_amount: Math.round(amount * 100), // in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/donate-success`,
      cancel_url: `${process.env.FRONTEND_URL}/donate-cancel`,
      customer_email: email,
      metadata: {
        digital contributionId: digital contribution._id.toString(),
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err.message);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
});

export default router;
