import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Invalid amount",
      });
    }

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: "donor@gfssga.org",
        amount: Number(amount) * 100
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.json(response.data.data);
  } catch (err) {
    console.error(
      "Paystack initialize error:",
      err.response?.data || err.message
    );

    return res.status(500).json({
      message: "Paystack initialization failed"
    });
  }
});

export default router;
