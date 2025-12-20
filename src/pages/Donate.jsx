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
  //   DODOPAY HANDLER
  // ==========================
  const handleDodoPay = async () => {
  if (!amount) {
    alert("Please enter an amount");
    return;
  }

  try {
    const res = await fetch(
      `${backendURL}/api/dodopay/initiate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          email: "donor@example.com",
          name: "Anonymous Donor",
          currency: "USD",
        }),
      }
    );

    const data = await res.json();
    console.log("🟣 DodoPay response:", data);

    if (data?.checkout_url) {
      window.location.href = data.checkout_url;
    } else {
      alert("DodoPay initialization failed");
    }
  } catch (err) {
    console.error("❌ DodoPay Error:", err);
    alert("Unable to start DodoPay payment");
  }
 };

  // ==========================
  //   PAYSTACK HANDLER
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
    } catch (err) {
      alert("Unable to start Paystack payment");
    }
  };

  // ==========================
  //   GENERAL DONATE BUTTON
  // ==========================
  const handleDonate = async () => {
    if (!amount) return alert("Please select or enter an amount");

    if (method === "paystack") return handlePaystack();
    if (method === "dodopay") return handleDodoPay();

    // PAYPAL
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

    // FLUTTERWAVE
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
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          backdropFilter: "blur(8px)",
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
                background:
                  selected === i
                    ? "linear-gradient(90deg,#7c3aed,#06b6d4)"
                    : "rgba(255,255,255,0.1)",
                padding: "12px",
                borderRadius: "8px",
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
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
          }}
        />

        {/* PAYMENT METHODS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => setMethod("flutterwave")}
            style={{
              background:
                method === "flutterwave"
                  ? "linear-gradient(90deg,#7c3aed,#06b6d4)"
                  : "rgba(255,255,255,0.1)",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            🌐 Flutterwave
          </button>

          <button
            onClick={() => setMethod("paypal")}
            style={{
              background:
                method === "paypal"
                  ? "linear-gradient(90deg,#ffc439,#f0a500)"
                  : "rgba(255,255,255,0.1)",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            🅿️ PayPal
          </button>

          <button
            onClick={() => setMethod("paystack")}
            style={{
              background:
                method === "paystack"
                  ? "linear-gradient(90deg,#0aa83f,#0dc263)"
                  : "rgba(255,255,255,0.1)",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            💳 Paystack
          </button>

          <button
            onClick={() => setMethod("dodopay")}
            style={{
              background:
                method === "dodopay"
                  ? "linear-gradient(90deg,#f43f5e,#fb7185)"
                  : "rgba(255,255,255,0.1)",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            🟣 DodoPay
          </button>
        </div>

        {/* DONATE BUTTON */}
        <button
          onClick={handleDonate}
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "14px",
            borderRadius: "10px",
            fontWeight: "700",
            background:
              method === "paypal"
                ? "linear-gradient(90deg,#ffc439,#f0a500)"
                : method === "paystack"
                ? "linear-gradient(90deg,#0aa83f,#0dc263)"
                : method === "dodopay"
                ? "linear-gradient(90deg,#f43f5e,#fb7185)"
                : "linear-gradient(90deg,#7c3aed,#06b6d4)",
          }}
        >
          {method === "paypal"
            ? "Donate via PayPal 🅿️"
            : method === "paystack"
            ? "Donate via Paystack 💳"
            : method === "dodopay"
            ? "Donate via DodoPay 🟣"
            : "Donate via Flutterwave 🌐"}
        </button>
      </div>
    </div>
  );
}
