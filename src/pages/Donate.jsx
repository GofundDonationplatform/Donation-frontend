// src/pages/Donate.jsx
import React, { useState } from "react";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState(null);
  const [method, setMethod] = useState("flutterwave");

  const amounts = [200, 500, 1000, 2500, 5000, 10000];

  const backendURL =
    import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

  // ==========================
  //   DODOPAY HANDLER (FIXED)
  // ==========================
  const handleDodoPay = async () => {
    if (!amount) {
      alert("Please select or enter an amount");
      return;
    }

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
      console.log("DodoPay response:", data);

      if (!data.checkout_url) {
        alert("DodoPay initialization failed");
        return;
      }

      // ✅ REAL REDIRECT
      window.location.href = data.checkout_url;
    } catch (err) {
      console.error("DodoPay error:", err);
      alert("Unable to start DodoPay payment");
    }
  };

  // ==========================
  //   PAYSTACK
  // ==========================
  const handlePaystack = async () => {
    if (!amount) return alert("Please enter an amount");

    try {
      const res = await fetch(`${backendURL}/api/paystack/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          email: "donor@example.com",
          name: "Paystack Donor",
          currency: "NGN",
        }),
      });

      const data = await res.json();
      if (data?.authorization_url) {
        window.location.href = data.authorization_url;
        return;
      }

      alert("Paystack initialization failed.");
    } catch {
      alert("Unable to start Paystack payment");
    }
  };

  // ==========================
  //   MAIN DONATE BUTTON
  // ==========================
  const handleDonate = () => {
    if (method === "dodopay") return handleDodoPay();
    if (method === "paystack") return handlePaystack();

    alert("Other gateways not handled here");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#1e293b 0%,#475569 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "32px",
          maxWidth: "480px",
          width: "100%",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Make a Donation 🌍</h2>

        {/* AMOUNTS */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {amounts.map((amt, i) => (
            <button
              key={i}
              onClick={() => {
                setSelected(i);
                setAmount(amt);
              }}
              style={{
                flex: "1 1 30%",
                padding: "12px",
                borderRadius: "8px",
                background:
                  selected === i
                    ? "linear-gradient(90deg,#7c3aed,#06b6d4)"
                    : "rgba(255,255,255,0.1)",
              }}
            >
              ${amt.toLocaleString()}
            </button>
          ))}
        </div>

        {/* CUSTOM AMOUNT */}
        <input
          type="number"
          value={amount}
          placeholder="Enter custom amount"
          onChange={(e) => {
            setAmount(e.target.value);
            setSelected(null);
          }}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            borderRadius: "8px",
            background: "transparent",
            color: "white",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        />

        {/* METHODS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button onClick={() => setMethod("paystack")}>💳 Paystack</button>
          <button onClick={() => setMethod("dodopay")}>🟣 DodoPay</button>
        </div>

        {/* DONATE */}
        <button
          type="button"
          onClick={handleDonate}
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "14px",
            borderRadius: "10px",
            fontWeight: "700",
            background:
              method === "dodopay"
                ? "linear-gradient(90deg,#f43f5e,#fb7185)"
                : "linear-gradient(90deg,#0aa83f,#0dc263)",
          }}
        >
          {method === "dodopay"
            ? "Pay with DodoPay 🟣"
            : "Pay with Paystack 💳"}
        </button>
      </div>
    </div>
  );
}
