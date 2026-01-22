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

  // 🟠 Flutterwave
  async function handleFlutterwave() {
    console.log("Flutterwave clicked");
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
    } catch (err) {
      console.error("Flutterwave error:", err);
      alert("Flutterwave is temporarily unavailable.");
    }
    setLoading(false);
  }

  // 🟢 Paystack
  async function handlePaystack() {
    console.log("Paystack clicked");
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
    } catch (err) {
      console.error("Paystack error:", err);
      alert("Paystack is temporarily unavailable.");
    }
    setLoading(false);
  }

  // 🔵 PayPal
  async function handlePayPal() {
    console.log("PayPal clicked");
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
    } catch (err) {
      console.error("PayPal error:", err);
      alert("PayPal is temporarily unavailable.");
    }
    setLoading(false);
  }

  // 🟣 DodoPay
  function handleDodoPay() {
    console.log("DodoPay clicked");
    // Temporary working redirect (until backend is ready)
    window.open("https://dodopayments.com", "_blank");
  }

  // 🏦 Bank Transfer
  function handleBankTransfer() {
    console.log("Bank transfer clicked");
    alert(
      "Bank Transfer Details:\n\nAccount Name: GFSSGA Impact Network\nBank: Example Bank\nAccount Number: 1234567890"
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 text-white">

        {/* Header */}
        <h2 className="text-3xl font-extrabold mb-2 text-center text-indigo-400">
          Support a Digital Impact
        </h2>
        <p className="text-gray-300 mb-6 text-center">
          Select an amount and continue securely
        </p>

        {/* Presets */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setAmount(p)}
              className={`py-2 rounded-xl font-semibold transition ${
                amount === p
                  ? "bg-cyan-400 text-black shadow-lg"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-200"
              }`}
            >
              ${p.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <input
          type="number"
          value={amount}
          min="1"
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full border border-gray-600 rounded-xl p-3 mb-6 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter custom amount"
        />

        {/* Payment buttons */}
        <div className="space-y-3">

          <button
            onClick={handleFlutterwave}
            className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-semibold transition"
          >
            🟠 Pay with Flutterwave
          </button>

          <button
            onClick={handlePaystack}
            className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 py-3 rounded-xl font-semibold transition"
          >
            🟢 Pay with Paystack
          </button>

          <button
            onClick={handlePayPal}
            className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold transition"
          >
            🔵 Pay with PayPal
          </button>

          <button
            onClick={handleDodoPay}
            className="w-full flex items-center justify-center gap-3 bg-purple-500 hover:bg-purple-600 py-3 rounded-xl font-semibold transition"
          >
            🟣 Pay with DodoPay
          </button>

          <button
            onClick={handleBankTransfer}
            className="w-full flex items-center justify-center gap-3 bg-gray-600 hover:bg-gray-700 py-3 rounded-xl font-semibold transition"
          >
            🏦 Bank Transfer
          </button>

        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          Payments are processed securely via third-party gateways.
        </p>
      </div>
    </div>
  );
}
