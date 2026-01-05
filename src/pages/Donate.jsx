// src/pages/Donate.jsx
import React, { useState } from "react";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState(null);
  const [method, setMethod] = useState("flutterwave");
  const [showGray, setShowGray] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const amounts = [200, 500, 1000, 2500, 5000, 10000];

  const backendURL =
    import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

  // ==========================
  // DODOPAY
  // ==========================
  const handleDodoPay = async () => {
    if (!amount) return alert("Select amount");

    try {
      const res = await fetch(`${backendURL}/api/dodopay/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          email: "donor@example.com",
          name: "Anonymous Donor",
        }),
      });

      const data = await res.json();
      if (!data.checkout_url) return alert("DodoPay failed");

      window.location.href = data.checkout_url;
    } catch {
      alert("DodoPay error");
    }
  };

  // ==========================
  // MAIN DONATE HANDLER
  // ==========================
  const handleDonate = () => {
    if (!amount) return alert("Select amount");

    if (method === "dodopay") return handleDodoPay();
    if (method === "gray") return setShowGray(true);

    alert(`${method} flow already handled`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", padding: 20 }}>
      <div style={{ maxWidth: 480, margin: "auto", color: "white" }}>
        <h2 style={{ textAlign: "center" }}>Make a Donation 🌍</h2>

        {/* AMOUNTS */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {amounts.map((amt, i) => (
            <button
              key={i}
              onClick={() => {
                setSelected(i);
                setAmount(amt);
              }}
              style={{
                flex: "1 1 30%",
                padding: 12,
                borderRadius: 8,
                background:
                  selected === i ? "#22c55e" : "rgba(255,255,255,0.1)",
              }}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* PAYMENT METHODS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginTop: 20 }}>
          <button onClick={() => setMethod("flutterwave")}>🌐 Flutterwave</button>
          <button onClick={() => setMethod("paypal")}>🅿️ PayPal</button>
          <button onClick={() => setMethod("paystack")}>💳 Paystack</button>
          <button onClick={() => setMethod("dodopay")}>🟣 DodoPay</button>
          <button onClick={() => setMethod("gray")}>🏦 Bank Transfer (Gray)</button>
        </div>

        {/* DONATE BUTTON */}
        <button
          type="button"
          onClick={handleDonate}
          style={{
            width: "100%",
            marginTop: 25,
            padding: 14,
            borderRadius: 10,
            background: "#22c55e",
            fontWeight: "700",
          }}
        >
          Continue Payment →
        </button>
      </div>

      {/* ==========================
          GRAY MODAL
      ========================== */}
      {showGray && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div style={{ background: "#020617", padding: 20, borderRadius: 12, width: 320 }}>
            <h3>Bank Transfer</h3>

            <p><b>Bank:</b> Gray Business Bank</p>
            <p><b>Account Name:</b> GFSSGA Impact Network</p>
            <p><b>Account Number:</b> 1234567890</p>
            <p><b>Amount:</b> ${amount}</p>
            <p><b>Reference:</b> GFSSGA-{Date.now()}</p>

            <input
              type="file"
              onChange={(e) => setReceipt(e.target.files[0])}
              style={{ marginTop: 10 }}
            />

            <button
              onClick={() => {
                alert("Payment submitted for confirmation");
                setShowGray(false);
              }}
              style={{
                width: "100%",
                marginTop: 15,
                padding: 10,
                background: "#22c55e",
                borderRadius: 8,
              }}
            >
              I’ve Completed Payment
            </button>

            <button
              onClick={() => setShowGray(false)}
              style={{ width: "100%", marginTop: 8, background: "transparent", color: "white" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
