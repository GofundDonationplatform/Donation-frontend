// src/pages/SupportPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SupportPage() {
  const presets = [100, 250, 500, 1000, 3000, 6000, 12000];
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  const backendBase =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // 🟢 Flutterwave Support
  async function handleFlutterwaveSupport() {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        amount: Number(amount),
        currency: "USD",
      };
      const res = await axios.post(`${backendBase}/api/donate`, payload);

      if (res.data?.link || res.data?.url) {
        window.location.href = res.data.link || res.data.url;
      } else {
        alert("Digital Impact Support failed — no redirect URL.");
      }
    } catch (err) {
      alert("Flutterwave failed.");
    }
    setLoading(false);
  }

  // 🔴 Paystack Support
  async function handlePaystackSupport() {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        amount: Number(amount),
        email: "donor@example.com",
        name: "Donor",
        currency: "NGN",
      };

      const res = await axios.post(
        `${backendBase}/api/paystack/initialize`,
        payload
      );

      if (res.data?.authorization_url) {
        window.location.href = res.data.authorization_url;
      } else {
        alert("Paystack init failed.");
      }
    } catch (err) {
      alert("Paystack error. Check backend.");
    }

    setLoading(false);
  }

  // 🟡 PayPal Support
  async function handlePayPalSupport() {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${backendBase}/api/paypal/create-payment`,
        { amount }
      );

      if (res.data?.approvalUrl) {
        window.location.href = res.data.approvalUrl;
      } else {
        alert("PayPal init failed.");
      }
    } catch (err) {
      alert("PayPal digital impact support failed.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex justify-center px-4 py-10">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-3xl font-extrabold mb-4 text-center text-indigo-600">
            Make a Digital Impact Support
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Select a preset amount or enter your custom digital impact support.
          </p>

          {/* Amount Presets */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`py-2 rounded-lg font-semibold text-sm sm:text-base ${
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
            Custom Amount (USD)
          </label>
          <input
            type="number"
            value={amount}
            min="1"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-indigo-500"
          />

          {/* PAYMENT BUTTONS */}
          <div className="space-y-3 mt-4">

            {/* Flutterwave */}
            <button
              onClick={handleFlutterwaveSupport}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              Support via Flutterwave
            </button>

            {/* Paystack */}
            <button
              onClick={handlePaystackSupport}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              Support via Paystack
            </button>

            {/* PayPal */}
            <button
              onClick={handlePayPalSupport}
              disabled={loading}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition disabled:opacity-50"
            >
              Support via PayPal
            </button>

          </div>

          <p className="text-xs text-gray-500 text-center mt-3">
            You will be redirected to a secure payment gateway.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 mt-6">
        <div className="space-x-4">
          <Link to="/terms" className="text-blue-600 hover:underline">Terms</Link>
          <Link to="/privacy" className="text-blue-600 hover:underline">Privacy</Link>
          <Link to="/refund" className="text-blue-600 hover:underline">Refund</Link>
        </div>
        <p className="text-gray-500 mt-2 text-sm">
          © 2025 GFSSGA Impact Network
        </p>
      </footer>
    </div>
  );
}
