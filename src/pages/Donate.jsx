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
  //   PAYSTACK HANDLER
  // ==========================
  const handlePaystack = async () => {
    if (!amount) return alert("Please enter an amount");

    try {
      console.log("🟢 Initializing Paystack...");
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
      console.log("🔵 Paystack response:", data);

      if (data?.authorization_url) {
        window.location.href = data.authorization_url;
        return;
      }

      alert("Paystack initialization failed.");
    } catch (err) {
      console.error("❌ Paystack Error:", err);
      alert("Unable to start Paystack payment");
    }
  };

  // ==========================
  //   GENERAL DONATE BUTTON
  // ==========================
  const handleDonate = async () => {
    if (!amount) return alert("Please select or enter an amount");

    // --- PAYSTACK ---
    if (method === "paystack") return handlePaystack();

    // --- PAYPAL ---
    if (method === "paypal") {
      try {
        const res = await fetch(`${backendURL}/api/paypal/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });
        const data = await res.json();

        if (data?.id) {
          window.location.href = `https://www.paypal.com/checkoutnow?token=${data.id}`;
        } else {
          alert("PayPal initialization failed");
        }
      } catch {
        alert("Unable to start PayPal payment");
      }
      return;
    }

    // --- FLUTTERWAVE ---
    try {
      const res = await fetch(`${backendURL}/api/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          name: "Anonymous Donor",
          email: "donor@example.com",
          currency: "USD",
        }),
      });

      const data = await res.json();

      if (data?.link) {
        window.location.href = data.link;
      } else {
        alert("Flutterwave initialization failed");
      }
    } catch {
      alert("Unable to start Flutterwave payment");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #1e293b 0%, #475569 100%)",
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
          maxWidth: "460px",
          width: "100%",
          color: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          backdropFilter: "blur(8px)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Make a Donation 🌍
        </h2>

        {/* PRESET AMOUNTS */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          {amounts.map((amt, i) => (
            <button
              key={i}
              onClick={() => {
                setSelected(i);
                setAmount(amt);
              }}
              style={{
                flex: "1 1 30%",
                background:
                  selected === i
                    ? "linear-gradient(90deg,#7c3aed,#06b6d4)"
                    : "rgba(255,255,255,0.1)",
                color: "white",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              ${amt.toLocaleString()}
            </button>
          ))}
        </div>

        {/* CUSTOM AMOUNT */}
        <input
          type="number"
          placeholder="Enter custom amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setSelected(null);
          }}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "white",
            fontSize: "16px",
          }}
        />

        {/* PAYMENT METHOD SELECTOR */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => setMethod("flutterwave")}
            style={{
              flex: 1,
              background:
                method === "flutterwave"
                  ? "linear-gradient(90deg,#7c3aed,#06b6d4)"
                  : "rgba(255,255,255,0.1)",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            🌐 Flutterwave
          </button>

          <button
            onClick={() => setMethod("paypal")}
            style={{
              flex: 1,
              background:
                method === "paypal"
                  ? "linear-gradient(90deg,#ffc439,#f0a500)"
                  : "rgba(255,255,255,0.1)",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            🅿️ PayPal
          </button>

          <button
            onClick={() => setMethod("paystack")}
            style={{
              flex: 1,
              background:
                method === "paystack"
                  ? "linear-gradient(90deg,#0aa83f,#0dc263)"
                  : "rgba(255,255,255,0.1)",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            💳 Paystack
          </button>
        </div>

        {/* FINAL DONATE BUTTON */}
        <button
          onClick={handleDonate}
          style={{
            width: "100%",
            background:
              method === "paypal"
                ? "linear-gradient(90deg,#ffc439,#f0a500)"
                : method === "paystack"
                ? "linear-gradient(90deg,#0aa83f,#0dc263)"
                : "linear-gradient(90deg,#7c3aed,#06b6d4)",
            color: "white",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          {method === "paypal"
            ? "Donate via PayPal 🅿️"
            : method === "paystack"
            ? "Donate via Paystack 💳"
            : "Donate via Flutterwave 🌐"}
        </button>
      </div>
    </div>
  );
}
