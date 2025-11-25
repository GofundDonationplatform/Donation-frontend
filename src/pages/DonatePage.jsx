// src/pages/DonatePage.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DonatePage() {
  const presets = [100, 250, 500, 1000, 3000, 6000, 12000];
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  // Backend URL
  const backendBase =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  console.log("Backend URL:", backendBase);

  /* ===============================
        FLUTTERWAVE DONATE
  ================================== */
  async function handleFlutterwaveDonate() {
    if (!amount || amount <= 0) return alert("Enter a valid amount");

    setLoading(true);
    try {
      const payload = {
        amount: Number(amount),
        currency: "USD",
      };

      const res = await axios.post(`${backendBase}/api/donate`, payload);

      if (res.data?.link) window.location.href = res.data.link;
      else alert("Error: No payment link returned.");
    } catch (err) {
      console.error("Flutterwave Error:", err);
      alert("Flutterwave failed.");
    }
    setLoading(false);
  }

  /* ===============================
        PAYSTACK DONATE
  ================================== */
  async function handlePaystackDonate() {
    if (!amount || amount <= 0) return alert("Enter a valid amount");

    setLoading(true);
    try {
      const payload = {
        amount: Number(amount),
        email: "donor@example.com",
        currency: "NGN",
      };

      const res = await axios.post(
        `${backendBase}/api/paystack/initialize`,
        payload
      );

      if (res.data?.authorization_url) {
        window.location.href = res.data.authorization_url;
      } else {
        alert("Paystack failed to create payment link.");
      }
    } catch (err) {
      console.error("Paystack Error:", err);
      alert("Paystack failed.");
    }

    setLoading(false);
  }

  /* ===============================
             PAYPAL DONATE
  ================================== */
  async function handlePayPalDonate() {
    if (!amount || amount <= 0) return alert("Enter a valid amount");

    setLoading(true);
    try {
      const res = await axios.post(
        `${backendBase}/api/paypal/create-payment`,
        { amount }
      );

      if (res.data?.approvalUrl) {
        window.location.href = res.data.approvalUrl;
      } else {
        alert("PayPal failed to initialize.");
      }
    } catch (err) {
      console.error("PayPal Error:", err);
      alert("PayPal failed.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="flex-grow flex items-start justify-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">
            Make a Donation
          </h2>

          <p className="text-gray-600 mb-6 text-center">
            Choose an amount or enter a custom value.
          </p>

          {/* Preset Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`py-2 rounded-lg font-semibold ${
                  amount === p
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                ${p.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom amount (USD)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-indigo-500"
            min="1"
          />

          {/* DONATE BUTTONS */}
          <div className="space-y-3">

            {/* Flutterwave */}
            <button
              onClick={handleFlutterwaveDonate}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-50"
            >
              Donate via Flutterwave
            </button>

            {/* Paystack (NEW BUTTON) */}
            <button
              onClick={handlePaystackDonate}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
            >
              Donate with Paystack
            </button>

            {/* PayPal */}
            <button
              onClick={handlePayPalDonate}
              disabled={loading}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition font-semibold disabled:opacity-50"
            >
              Donate with PayPal
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-500 text-center">
            You’ll be redirected to a secure payment page.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-100 text-center py-6">
        <div className="space-x-4">
          <Link to="/terms" className="text-blue-600 hover:underline">
            Terms
          </Link>
          <Link to="/privacy" className="text-blue-600 hover:underline">
            Privacy
          </Link>
          <Link to="/refund" className="text-blue-600 hover:underline">
            Refunds
          </Link>
        </div>
        <p className="text-gray-500 mt-2">
          © 2025 GFSSGA Impact Network
        </p>
      </footer>
    </div>
  );
}
