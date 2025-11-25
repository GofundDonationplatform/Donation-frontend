// src/pages/DonatePage.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DonatePage() {
  const presets = [100, 250, 500, 1000, 3000, 6000, 12000];
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  // Backend URL
  const backendBase = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  console.log("✅ Backend Base URL:", backendBase);

  // 🟢 Flutterwave handler
  async function handleFlutterwaveDonate() {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const payload = { amount: Number(amount), currency: "USD", name: undefined, email: undefined };
      console.log("POST →", `${backendBase}/api/donate`, payload);
      const res = await axios.post(`${backendBase}/api/donate`, payload);

      if (res.data?.link) {
        window.location.href = res.data.link;
      } else if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        console.error("No redirect link returned", res.data);
        alert("Donation failed: No redirect link returned.");
      }
    } catch (err) {
      console.error("Flutterwave Donate Error:", err.response?.data || err.message || err);
      alert("Donation failed, please try again.");
    } finally {
      setLoading(false);
    }
  }

  // 🟡 PayPal Donate
  async function handlePayPalDonate() {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      console.log("POST →", `${backendBase}/api/paypal/create-payment`, { amount });
      const res = await axios.post(`${backendBase}/api/paypal/create-payment`, { amount });

      if (res.data?.approvalUrl) {
        window.location.href = res.data.approvalUrl;
      } else {
        alert("PayPal init failed — no approval URL returned.");
      }
    } catch (err) {
      console.error("❌ PayPal Error:", err);
      alert("PayPal donation failed. Check console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="flex-grow flex items-start justify-center py-12 px-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">Make a Donation</h2>
          <p className="text-gray-600 mb-6 text-center">Choose an amount or enter a custom value (USD).</p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`py-2 rounded-lg font-semibold ${
                  amount === p ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                ${p.toLocaleString()}
              </button>
            ))}
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1">Custom amount (USD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-indigo-500"
            min="1"
            placeholder="Enter amount, e.g. 150"
          />

          <div className="space-y-3">
            <button
              onClick={handleFlutterwaveDonate}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 font-semibold"
            >
              {loading ? "Processing..." : `Donate via Flutterwave ($${Number(amount).toLocaleString()})`}
            </button>

            <button
              onClick={handlePayPalDonate}
              disabled={loading}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition disabled:opacity-50 font-semibold"
            >
              Donate with PayPal
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-500 text-center">
            You’ll be redirected to a secure payment page to complete your donation.
          </p>
        </div>
      </div>

      {/* Footer with Policy Links */}
      <footer className="bg-gray-100 text-center py-6 mt-12">
        <div className="space-x-4">
          <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>
          <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          <Link to="/refund" className="text-blue-600 hover:underline">Refund Policy</Link>
        </div>
        <p className="text-gray-500 mt-2">&copy; 2025 GFSSGA Impact Network</p>
      </footer>
    </div>
  );
}
