// src/pages/DonatePage.jsx
import React, { useState } from "react";
import axios from "axios";

export default function DonatePage() {
  const presets = [100, 250, 500, 1000, 3000, 6000, 12000];
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);

  const backendBase =
    import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  async function handleDonate() {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      console.log("POST to backend:", backendBase + "/api/donate", { amount: Number(amount) * 100 });
      const res = await axios.post(`${backendBase}/api/donate`, {
        amount: Number(amount) * 100, // cents
      });
      console.log("Backend response:", res.data);
      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        alert("Donation failed: no redirect URL returned. Check console.");
      }
    } catch (err) {
      console.error("Donate error:", err?.response || err);
      alert("Donation failed, try again (check console).");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-3">Make a Donation</h2>
        <p className="text-gray-600 mb-6">Choose an amount or enter a custom value (USD).</p>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setAmount(p)}
              className={`py-2 rounded-lg font-semibold ${
                amount === p ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"
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
          className="w-full border rounded-lg p-3 mb-4"
          min="1"
          placeholder="Enter amount, e.g. 150"
        />

        <button
          onClick={handleDonate}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : `Donate $${Number(amount).toLocaleString()}`}
        </button>

        <p className="mt-4 text-xs text-gray-500">
          This will redirect you to Stripe Checkout for secure payment.
        </p>
      </div>
    </div>
  );
}
