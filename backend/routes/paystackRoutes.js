import express from "express";
import axios from "axios";
import Transaction from "../models/Transaction.js";
import Campaign from "../models/Campaign.js";
import dotenv from "dotenv";

dotenv.config();

console.log("✅ PAYSTACK ROUTE LOADED");

const router = express.Router();

const SUPPORTED_CURRENCIES = {
  NGN: {
    minimum: 50,
  },
  USD: {
    minimum: 2,
  },
};

const generateReference = () =>
  `ps_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;

// Convert major currency units to Paystack subunits.
const toSubunit = (amount, currency) =>
  Math.round(Number(amount) * 100);

// Initialize a Paystack transaction
router.post("/initialize", async (req, res) => {
  try {
    const {
      amount,
      email = "donor@example.com",
      name = "Donor",
      currency = "NGN",
      campaignId,
    } = req.body;

    const normalizedCurrency =
      String(currency).toUpperCase();

    if (!SUPPORTED_CURRENCIES[normalizedCurrency]) {
      return res.status(400).json({
        error: "Unsupported currency",
        supportedCurrencies: Object.keys(
          SUPPORTED_CURRENCIES
        ),
      });
    }

    if (
      !amount ||
      isNaN(amount) ||
      Number(amount) <= 0
    ) {
      return res.status(400).json({
        error: "Invalid amount",
      });
    }

    const numericAmount = Number(amount);

    if (
      numericAmount <
      SUPPORTED_CURRENCIES[normalizedCurrency].minimum
    ) {
      return res.status(400).json({
        error: `Minimum donation for ${normalizedCurrency} is ${SUPPORTED_CURRENCIES[normalizedCurrency].minimum}`,
      });
    }

    const paystackSecret =
      process.env.PAYSTACK_SECRET_KEY;

    if (!paystackSecret) {
      return res.status(500).json({
        error: "Paystack secret not configured",
      });
    }

    const tx_ref = generateReference();

    await Transaction.create({
      name,
      email,
      amount: numericAmount,
      currency: normalizedCurrency,
      campaignId: campaignId || undefined,
      tx_ref,
      status: "pending",
      method: "paystack",
      meta: {
        campaignId,
        donorName: name,
        requestedCurrency: normalizedCurrency,
      },
    });

    const callback_url =
      `${(
        process.env.FRONTEND_URL ||
        "http://localhost:5173"
      ).replace(/\/$/, "")}/donate-success`;

    const body = {
      email,
      amount: toSubunit(
        numericAmount,
        normalizedCurrency
      ),
      currency: normalizedCurrency,
      reference: tx_ref,
      callback_url,
      metadata: {
        campaignId,
        donorName: name,
        currency: normalizedCurrency,
      },
    };

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      body,
      {
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(
      response.data.data || response.data
    );
  } catch (err) {
    console.error(
      "Paystack initialize error:",
      err.response?.data || err.message
    );

    res.status(500).json({
      error: "Failed to initialize Paystack transaction",
      details:
        err.response?.data || err.message,
    });
  }
});

// Verify a transaction by reference
router.get("/verify", async (req, res) => {
  try {
    const { reference } = req.query;

    const paystackSecret =
      process.env.PAYSTACK_SECRET_KEY;

    if (!reference) {
      return res.status(400).json({
        error: "Missing reference",
      });
    }

    if (!paystackSecret) {
      return res.status(500).json({
        error: "Paystack secret not configured",
      });
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference
      )}`,
      {
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
        },
      }
    );

    const data = response.data?.data;

    if (
      data &&
      data.status === "success"
    ) {
      const transaction =
        await Transaction.findOne({
          tx_ref: reference,
        });

      if (!transaction) {
        return res.status(404).json({
          error: "Transaction not found",
        });
      }

      if (
        transaction.status === "completed"
      ) {
        return res.json(response.data);
      }

      transaction.status = "completed";
      transaction.method = "paystack";
      transaction.currency =
        data.currency || transaction.currency;

      transaction.meta = {
        ...(transaction.meta || {}),
        ...data,
      };

      await transaction.save();

      /*
       * IMPORTANT:
       * Campaign.amountRaised currently stores one numeric total.
       * We only update it when the campaign currency matches the
       * transaction currency, preventing NGN and USD from being
       * silently mixed together.
       */
      if (
        transaction.campaignId
      ) {
        const campaign =
          await Campaign.findById(
            transaction.campaignId
          );

        if (
          campaign &&
          (!campaign.currency ||
            campaign.currency ===
              transaction.currency)
        ) {
          await Campaign.findByIdAndUpdate(
            transaction.campaignId,
            {
              $inc: {
                amountRaised:
                  transaction.amount,
                donorCount: 1,
              },
            }
          );
        }
      }
    }

    res.json(response.data);
  } catch (err) {
    console.error(
      "Paystack verify error:",
      err.response?.data || err.message
    );

    res.status(500).json({
      error: "Paystack verify failed",
      details:
        err.response?.data || err.message,
    });
  }
});

export default router;
