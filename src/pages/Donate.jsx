// src/pages/Donate.jsx
import React, { useState } from "react";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [method, setMethod] = useState("dodopay");
  const [showBankModal, setShowBankModal] = useState(false);

  const presets = [200, 500, 1000, 2500, 5000, 10000];

  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // ==========================
  // PAYMENT HANDLERS
  // ==========================
  const ensureAmount = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please select or enter a valid amount");
      return false;
    }
    return true;
  };

  const redirectOrFail = (url, msg) => {
    if (url) window.location.href = url;
    else alert(msg);
  };

  const payFlutterwave = async () => {
    if (!ensureAmount()) return;
    const res = await fetch(`${backendURL}/api/flutterwavePay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) }),
    });
    const data = await res.json();
    redirectOrFail(data?.link, "Flutterwave initialization failed");
  };

  const payPaystack = async () => {
    if (!ensureAmount()) return;
    const res = await fetch(`${backendURL}/api/paystack/initialize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(amount),
        email: "supporter@example.com",
        currency: "USD",
      }),
    });
    const data = await res.json();
    redirectOrFail(data?.authorization_url, "Paystack initialization failed");
  };

  const payPaypal = async () => {
    if (!ensureAmount()) return;
    const res = await fetch(`${backendURL}/api/paypal/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount) }),
    });
    const data = await res.json();
    redirectOrFail(
      data?.id && `https://www.paypal.com/checkoutnow?token=${data.id}`,
      "PayPal initialization failed"
    );
  };

  const payDodo = async () => {
    if (!ensureAmount()) return;
    const res = await fetch(`${backendURL}/api/dodopay/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(amount),
        email: "supporter@example.com",
        name: "Supporter",
      }),
    });
    const data = await res.json();
    redirectOrFail(data?.checkout_url, "DodoPay checkout failed");
  };

  const proceed = () => {
    switch (method) {
      case "flutterwave":
        return payFlutterwave();
      case "paypal":
        return payPaypal();
      case "paystack":
        return payPaystack();
      case "dodopay":
        return payDodo();
      case "bank":
        return setShowBankModal(true);
      default:
        alert("Select a payment method");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-lg bg-slate-800 rounded-2xl p-6 text-white shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-2">
          Support Our Digital Impact 🌍
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Choose an amount and a payment method
        </p>

        {/* PRESET AMOUNTS */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setAmount(p);
                setSelectedAmount(i);
              }}
              className={`py-2 rounded-lg font-semibold ${
                selectedAmount === i
                  ? "bg-cyan-500"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              ${p.toLocaleString()}
            </button>
          ))}
        </div>

        {/* CUSTOM AMOUNT */}
        <input
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setSelectedAmount(null);
          }}
          placeholder="Custom amount"
          className="w-full mb-5 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600"
        />

        {/* PAYMENT METHODS */}
        <div className="space-y-2">
          <button onClick={() => setMethod("flutterwave")} className="w-full py-3 rounded-lg bg-indigo-600">
            Pay via Flutterwave
          </button>
          <button onClick={() => setMethod("paypal")} className="w-full py-3 rounded-lg bg-yellow-500 text-black">
            Pay via PayPal
          </button>
          <button onClick={() => setMethod("paystack")} className="w-full py-3 rounded-lg bg-green-600">
            Pay via Paystack
          </button>
          <button onClick={() => setMethod("dodopay")} className="w-full py-3 rounded-lg bg-rose-600">
            Pay via DodoPay
          </button>
          <button onClick={() => setMethod("bank")} className="w-full py-3 rounded-lg bg-gray-600">
            Bank Transfer
          </button>
        </div>

        {/* MAIN BUTTON */}
        <button
          onClick={proceed}
          className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-bold"
        >
          Proceed to Payment
        </button>
      </div>

      {/* BANK MODAL */}
      {showBankModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-xl w-full max-w-md">
            <h3 className="font-bold mb-2">Bank Transfer Details</h3>
            <p><b>Account Name:</b> GFSSGA IMPACT NETWORK</p>
            <p><b>Account Number:</b> 214673810876</p>
            <p><b>Bank:</b> Lead Bank</p>

            <button
              onClick={() => setShowBankModal(false)}
              className="mt-4 w-full py-2 bg-red-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
