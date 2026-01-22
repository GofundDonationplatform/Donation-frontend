// src/pages/DonatePage.jsx
import React, { useState } from "react";
import axios from "axios";

export default function DonatePage() {
  const presets = [100, 250, 500, 1000, 3000, 6000, 12000];
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  const backendBase =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const validateAmount = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return false;
    }
    return true;
  };

  async function handleFlutterwave() {
    if (!validateAmount()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${backendBase}/api/donate`, {
        amount: Number(amount),
        currency: "USD",
      });
      if (res.data?.link || res.data?.url) {
        window.location.href = res.data.link || res.data.url;
      } else {
        alert("Flutterwave checkout unavailable.");
      }
    } catch {
      alert("Flutterwave is temporarily unavailable.");
    }
    setLoading(false);
  }

  async function handlePaystack() {
    if (!validateAmount()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${backendBase}/api/paystack/initialize`, {
        amount: Number(amount),
        email: "supporter@example.com",
        currency: "NGN",
      });
      if (res.data?.authorization_url) {
        window.location.href = res.data.authorization_url;
      } else {
        alert("Paystack checkout unavailable.");
      }
    } catch {
      alert("Paystack is temporarily unavailable.");
    }
    setLoading(false);
  }

  async function handlePayPal() {
    if (!validateAmount()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${backendBase}/api/paypal/create-payment`, {
        amount,
      });
      if (res.data?.approvalUrl) {
        window.location.href = res.data.approvalUrl;
      } else {
        alert("PayPal checkout unavailable.");
      }
    } catch {
      alert("PayPal is temporarily unavailable.");
    }
    setLoading(false);
  }

  function handleDodoPay() {
    alert("DodoPay checkout will be available shortly.");
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl border border-white/10 p-6">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-cyan-400">
            Support a Digital Impact
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Select an amount and continue securely
          </p>
        </div>

        {/* Amount Section */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Amount
          </label>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`py-2 rounded-lg text-sm font-semibold transition ${
                  amount === p
                    ? "bg-cyan-500 text-black"
                    : "bg-slate-800 hover:bg-slate-700 text-gray-200"
                }`}
              >
                ${p.toLocaleString()}
              </button>
            ))}
          </div>

          <input
            type="number"
            value={amount}
            min="1"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Enter custom amount"
          />
        </div>

        {/* Payment Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">
            Payment Method
          </h3>

          <button
            onClick={handleFlutterwave}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-black py-2.5 rounded-lg font-semibold transition disabled:opacity-50"
          >
            Pay with Flutterwave
          </button>

          <button
            onClick={handlePaystack}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-black py-2.5 rounded-lg font-semibold transition disabled:opacity-50"
          >
            Pay with Paystack
          </button>

          <button
            onClick={handlePayPal}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50"
          >
            Pay with PayPal
          </button>

          <button
            onClick={handleDodoPay}
            disabled={loading}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50"
          >
            Pay with DodoPay
          </button>

          <button
            onClick={() => alert("Bank transfer details will be displayed")}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2.5 rounded-lg font-semibold transition"
          >
            Bank Transfer
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-5">
          Payments are processed securely via third-party gateways.
        </p>
      </div>
    </div>
  );
}
