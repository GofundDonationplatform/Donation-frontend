// src/pages/DonatePage.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  // 🟣 Flutterwave
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

  // 🟢 Paystack
  async function handlePaystack() {
    if (!validateAmount()) return;
    setLoading(true);

    try {
      const res = await axios.post(
        `${backendBase}/api/paystack/initialize`,
        {
          amount: Number(amount),
          email: "supporter@example.com",
          currency: "NGN",
        }
      );

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

  // 🔵 PayPal
  async function handlePayPal() {
    if (!validateAmount()) return;
    setLoading(true);

    try {
      const res = await axios.post(
        `${backendBase}/api/paypal/create-payment`,
        { amount }
      );

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

  // 🟠 DodoPay (UI-ready, backend pending)
  function handleDodoPay() {
    alert("DodoPay checkout will be available shortly.");
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="flex-grow flex justify-center px-4 py-12">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">

          <h2 className="text-3xl font-extrabold mb-2 text-center text-indigo-600">
            Support a Digital Impact
          </h2>

          <p className="text-gray-600 mb-6 text-center">
            Choose an amount and a preferred payment method.
          </p>

          {/* Presets */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`py-2 rounded-lg font-semibold ${
                  amount === p
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                ${p.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Custom */}
          <input
            type="number"
            value={amount}
            min="1"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border rounded-lg p-3 mb-6 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter custom amount"
          />

          {/* PAYMENT METHODS */}
          <div className="space-y-3">

            <button
              onClick={handleFlutterwave}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              Pay via Flutterwave
            </button>

            <button
              onClick={handlePaystack}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Pay via Paystack
            </button>

            <button
              onClick={handlePayPal}
              disabled={loading}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600"
            >
              Pay via PayPal
            </button>

            <button
              onClick={handleDodoPay}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
            >
              Pay via DodoPay
            </button>

          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Payments are processed securely via third-party gateways.
          </p>
        </div>
      </div>

      <footer className="bg-slate-900 text-center py-6 text-sm text-gray-400">
        © {new Date().getFullYear()} GFSSGA Impact Network
      </footer>
    </div>
  );
}
