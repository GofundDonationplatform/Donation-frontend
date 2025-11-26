// src/pages/DonatePage.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DonatePage() {
  const presets = [200, 500, 1000, 2500, 5000, 10000];
  const [amount, setAmount] = useState(200);
  const [loading, setLoading] = useState(false);

  const backendBase = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // 🟣 Flutterwave
  async function handleFlutterwaveDonate() {
    if (!amount || isNaN(amount) || Number(amount) <= 0) return alert("Enter valid amount");

    setLoading(true);
    try {
      const res = await axios.post(`${backendBase}/api/donate`, {
        amount,
        currency: "USD",
      });

      window.location.href = res.data?.link || res.data?.url;
    } catch (e) {
      alert("Flutterwave failed.");
    }
    setLoading(false);
  }

  // 🟢 Paystack
  async function handlePaystackDonate() {
    if (!amount || isNaN(amount) || Number(amount) <= 0) return alert("Enter valid amount");

    setLoading(true);
    try {
      const res = await axios.post(`${backendBase}/api/paystack/initialize`, {
        amount,
        email: "donor@example.com",
        name: "User",
        currency: "NGN",
      });

      window.location.href = res.data.authorization_url;
    } catch (err) {
      alert("Paystack failed.");
    }
    setLoading(false);
  }

  // 🟡 PayPal
  async function handlePayPalDonate() {
    if (!amount || isNaN(amount) || Number(amount) <= 0) return alert("Enter valid amount");

    setLoading(true);
    try {
      const res = await axios.post(`${backendBase}/api/paypal/create-payment`, {
        amount,
      });

      window.location.href = res.data.approvalUrl;
    } catch (e) {
      alert("PayPal failed.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="flex-grow flex items-start justify-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">
            Make a Donation 🌍
          </h2>

          <p className="text-gray-600 mb-6 text-center">
            Every dollar makes a difference. Choose an amount or enter a custom one.
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
          <input
            type="number"
            value={amount}
            min="1"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter custom amount"
          />

          {/* Payment Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-4">

            {/* Flutterwave */}
            <button
              onClick={handleFlutterwaveDonate}
              disabled={loading}
              className="py-3 w-full rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90"
            >
              Flutterwave
            </button>

            {/* PayPal */}
            <button
              onClick={handlePayPalDonate}
              disabled={loading}
              className="py-3 w-full rounded-lg font-semibold bg-blue-200 text-blue-800 hover:bg-blue-300"
            >
              PayPal
            </button>

            {/* Paystack */}
            <button
              onClick={handlePaystackDonate}
              disabled={loading}
              className="py-3 w-full rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600"
            >
              Paystack
            </button>

          </div>

          {/* Big Main Button */}
          <button
            onClick={handleFlutterwaveDonate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90"
          >
            Donate via Flutterwave 💳
          </button>

          <p className="mt-4 text-xs text-gray-500 text-center">
            You’ll be redirected to a secure payment page.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 mt-12">
        <div className="space-x-4">
          <Link to="/terms" className="text-blue-600 hover:underline">Terms</Link>
          <Link to="/privacy" className="text-blue-600 hover:underline">Privacy</Link>
          <Link to="/refund" className="text-blue-600 hover:underline">Refund</Link>
        </div>
        <p className="text-gray-500 mt-2">&copy; 2025 GFSSGA Impact Network</p>
      </footer>
    </div>
  );
}
