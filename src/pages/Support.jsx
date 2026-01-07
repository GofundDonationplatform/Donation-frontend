// src/pages/Support.jsx
import React, { useState } from "react";

export default function Support() {
  const [amount, setAmount] = useState("");

  const handleNotReady = (method) => {
    alert(`${method} payment is not yet configured.`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-4">
      <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
        
        <h1 className="text-2xl font-bold text-cyan-400 mb-2 text-center">
          Support Our Mission
        </h1>
        <p className="text-gray-400 text-sm mb-6 text-center">
          Help us drive digital impact across communities 🌍
        </p>

        {/* AMOUNT INPUT */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-gray-300">
            Donation Amount (USD)
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
          />
        </div>

        {/* PAYMENT BUTTONS */}
        <div className="space-y-3">

          {/* FLUTTERWAVE */}
          <button
            onClick={() => handleNotReady("Flutterwave")}
            className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold transition"
          >
            💳 Pay via Flutterwave
          </button>

          {/* PAYPAL */}
          <button
            onClick={() => handleNotReady("PayPal")}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition"
          >
            🅿️ Pay via PayPal
          </button>

          {/* DODOPAY */}
          <button
            onClick={() => handleNotReady("DodoPay")}
            className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 font-semibold transition"
          >
            🦤 Pay via DodoPay
          </button>

          {/* BANK TRANSFER */}
          <button
            onClick={() => handleNotReady("Bank Transfer")}
            className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold transition"
          >
            🏦 Pay via Bank Transfer
          </button>
        </div>

        {/* FOOT NOTE */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          Secure payments • Trusted partners • Transparency guaranteed
        </p>
      </div>
    </div>
  );
}
