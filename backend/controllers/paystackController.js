// controllers/paystackController.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const BASE_URL = "https://api.paystack.co";

// 🟢 Initialize Paystack Payment
export const initializePaystack = async (req, res) => {
  try {
    let { amount, email, name, currency } = req.body;

    if (!amount || !email) {
      return res.status(400).json({ error: "Amount and email are required" });
    }

    // convert to kobo
    const amountInKobo = Number(amount) * 100;

    const payload = {
      email,
      amount: amountInKobo,
      currency: currency || "NGN",
      metadata: { name },
      callback_url: `${process.env.FRONTEND_URL.replace(/\/$/, "")}/donate-success`, 
    };

    const response = await axios.post(
      `${BASE_URL}/transaction/initialize`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({
      status: true,
      authorization_url: response.data.data.authorization_url,
      reference: response.data.data.reference,
    });
  } catch (error) {
    console.error("PAYSTACK INIT ERROR", error.response?.data || error);
    return res.status(500).json({ error: "Paystack initialization failed" });
  }
};

// 🟡 Verify Paystack Payment
export const verifyPaystack = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `${BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error("PAYSTACK VERIFY ERROR", error.response?.data || error);
    return res.status(500).json({ error: "Paystack verification failed" });
  }
};
