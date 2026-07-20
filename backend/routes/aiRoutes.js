import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "Please type a question first."
      });
    }

    if (!process.env.AI_API_KEY) {
      return res.status(500).json({
        reply: "GoFund AI is not configured yet. Please try again later."
      });
    }

    const response = await axios.post(
      process.env.AI_API_URL,
      {
        model: process.env.AI_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are GoFund AI, the helpful assistant for GoFundSS Digital Impact Support Platform. Help users understand campaigns, donations, payment methods, education support, women empowerment, child welfare, and platform policies. Be clear, friendly, honest, and never invent donation or payment information."
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply =
      response.data?.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response right now.";

    res.json({ reply });
  } catch (error) {
    console.error(
      "AI error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      reply: "GoFund AI is temporarily unavailable. Please try again shortly."
    });
  }
});

export default router;
