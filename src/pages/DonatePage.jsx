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

  // Flutterwave
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
        alert("Flutterwave checkout unavailable right now.");
      }
    } catch {
      alert("Flutterwave is temporarily unavailable.");
    }
    setLoading(false);
  }

  // Paystack
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

  // PayPal
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

  // DodoPay placeholder
  function handleDodoPay() {
    alert("DodoPay checkout will be available shortly.");
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 text-white">

        {/* Header */}
        <h2 className="text-3xl font-extrabold mb-2 text-center text-indigo-400">
          Support a Digital Impact
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          Choose an amount and a preferred payment method.
        </p>

        {/* Preset buttons */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setAmount(p)}
              className={`py-2 rounded-lg font-semibold transition-colors duration-200 ${
                amount === p
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-200"
              }`}
            >
              ${p.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Custom input */}
        <input
          type="number"
          value={amount}
          min="1"
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full border border-gray-600 rounded-lg p-3 mb-6 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter custom amount"
        />

        {/* Payment Methods */}
        <div className="space-y-3">
          <div className="text-center mb-2">
            <h3 className="text-lg font-bold text-gray-200">
              Choose a Payment Method
            </h3>
            <p className="text-sm text-gray-400">
              Securely support via your preferred gateway
            </p>
          </div>

          {/* Flutterwave */}
          <button
            onClick={handleFlutterwave}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            🟠 Pay via Flutterwave
          </button>

          {/* Paystack */}
          <button
            onClick={handlePaystack}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 py-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            🟢 Pay via Paystack
          </button>

          {/* PayPal */}
          <button
            onClick={handlePayPal}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            🔵 Pay via PayPal
          </button>

          {/* DodoPay */}
          <button
            onClick={handleDodoPay}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-purple-500 hover:bg-purple-600 py-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            🟣 Pay via DodoPay
          </button>

          {/* Bank Transfer */}
          <button
            onClick={() => alert("Bank transfer details will be displayed")}
            className="w-full flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-semibold transition"
          >
            🏦 Pay via Bank Transfer
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          Payments are processed securely via third-party gateways.
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-center py-6 text-sm text-gray-400 mt-6">
        © {new Date().getFullYear()} GFSSGA Impact Network
      </footer>
    </div>
  );
}
