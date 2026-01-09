// src/pages/Donate.jsx
import React, { useState } from "react";

export default function Donate() {
  const presets = [100, 250, 500, 1000, 3000, 6000, 12000];
  const [amount, setAmount] = useState(100);

  const backend =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const ensureAmount = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return false;
    }
    return true;
  };

  const payFlutterwave = async () => {
    if (!ensureAmount()) return;
    const r = await fetch(`${backend}/api/donate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const d = await r.json();
    if (d?.link || d?.url) window.location.href = d.link || d.url;
    else alert("Flutterwave initialization failed");
  };

  const payPaystack = async () => {
    if (!ensureAmount()) return;
    const r = await fetch(`${backend}/api/paystack/initialize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        email: "supporter@example.com",
        currency: "NGN",
      }),
    });
    const d = await r.json();
    if (d?.authorization_url) window.location.href = d.authorization_url;
    else alert("Paystack initialization failed");
  };

  const payPayPal = async () => {
    if (!ensureAmount()) return;
    const r = await fetch(`${backend}/api/paypal/create-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const d = await r.json();
    if (d?.approvalUrl) window.location.href = d.approvalUrl;
    else alert("PayPal initialization failed");
  };

  const payDodo = () => {
    alert("DodoPay checkout will be available shortly.");
  };

  const payBank = () => {
    alert(
      "Bank Transfer Details:\n\n" +
        "Account Name: GFSSGA Impact Network\n" +
        "Account Number: 214673810876\n" +
        "Bank: Lead Bank"
    );
  };

  return (
    <div className="donate-panel">
      <h2 className="center">Support a Digital Impact 🌍</h2>
      <p className="center muted">
        Choose an amount and a preferred payment method.
      </p>

      <div className="amount-grid">
        {presets.map((p) => (
          <button
            key={p}
            className={`amount-btn ${amount === p ? "selected" : ""}`}
            onClick={() => setAmount(p)}
          >
            ${p.toLocaleString()}
          </button>
        ))}
      </div>

      <div className="custom-amount">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      {/* PAYMENT BUTTONS */}
      <button
        className="btn"
        style={{ background: "linear-gradient(90deg,#f97316,#fb923c)" }}
        onClick={payFlutterwave}
      >
        🟠 Pay via Flutterwave
      </button>

      <br /><br />

      <button
        className="btn"
        style={{ background: "linear-gradient(90deg,#16a34a,#22c55e)" }}
        onClick={payPaystack}
      >
        🟢 Pay via Paystack
      </button>

      <br /><br />

      <button
        className="btn"
        style={{ background: "linear-gradient(90deg,#2563eb,#3b82f6)" }}
        onClick={payPayPal}
      >
        🔵 Pay via PayPal
      </button>

      <br /><br />

      <button
        className="btn"
        style={{ background: "linear-gradient(90deg,#7c3aed,#a855f7)" }}
        onClick={payDodo}
      >
        🟣 Pay via DodoPay
      </button>

      <br /><br />

      <button
        className="btn"
        style={{ background: "linear-gradient(90deg,#334155,#475569)" }}
        onClick={payBank}
      >
        🏦 Pay via Bank Transfer
      </button>
    </div>
  );
}
