// routes/paypalRoutes.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// === CREATE ORDER ===
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ error: "Amount required" });

    // Get credentials from env
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const secret = process.env.PAYPAL_SECRET;

    // Create Basic Auth header
    const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

    // Call PayPal API
    const response = await fetch(`${process.env.PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount,
            },
            description: "GoFundSS Donation",
          },
        ],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("PayPal API error:", data);
      return res.status(500).json({ error: "PayPal API error", details: data });
    }

    res.json(data);
  } catch (err) {
    console.error("PayPal order error:", err);
    res.status(500).json({ error: "Server error creating PayPal order" });
  }
});

// === CAPTURE ORDER ===
router.post("/capture-order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    const response = await fetch(
      `${process.env.PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("PayPal capture error:", data);
      return res.status(500).json({ error: "PayPal capture error", details: data });
    }

    res.json(data);
  } catch (err) {
    console.error("Capture order error:", err);
    res.status(500).json({ error: "Server error capturing order" });
  }
});

export default router;
