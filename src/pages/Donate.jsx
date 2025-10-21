// src/pages/Donate.jsx
import React, { useState } from "react";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState(null);
  const [method, setMethod] = useState("flutterwave"); // default option
  const amounts = [200, 500, 1000, 2500, 5000, 10000];

  // ✅ fallback if VITE_BACKEND_URL is not defined
  const backendURL =
    import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") || "http://localhost:5000";

  const handleDonate = async () => {
    if (!amount) return alert("Please select or enter an amount");

    // === PAYPAL ===
    if (method === "paypal") {
      try {
        console.log("🟡 Starting PayPal donation...");
        const res = await fetch(`${backendURL}/api/paypal/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });
        const data = await res.json();
        console.log("🔵 PayPal response:", data);
        if (data?.id) {
          window.location.href = `https://www.paypal.com/checkoutnow?token=${data.id}`;
        } else {
          alert("PayPal initialization failed");
        }
      } catch (err) {
        console.error("PayPal error:", err);
        alert("Unable to start PayPal payment");
      }
      return;
    }

    // === FLUTTERWAVE ===
    try {
      console.log("🟣 Starting Flutterwave donation...");
      const res = await fetch(`${backendURL}/api/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          name: "Anonymous Donor",
          email: "donor@example.com",
          currency: "USD", // ✅ Always send currency
        }),
      });

      const data = await res.json();
      console.log("🟢 Flutterwave backend response:", data);

      if (data?.link) {
        window.location.href = data.link;
      } else {
        console.error("Flutterwave init failed:", data);
        alert("Failed to start Flutterwave payment");
      }
    } catch (err) {
      console.error("Flutterwave error:", err);
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
          maxWidth: "480px",
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
        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            opacity: 0.9,
          }}
        >
          Every dollar makes a difference. Choose an amount or enter a custom one.
        </p>

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

        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <input
            type="number"
            placeholder="Enter custom amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setSelected(null);
            }}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "white",
              fontSize: "16px",
            }}
          />
        </div>

        {/* --- PAYMENT METHOD SELECTOR --- */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
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
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              marginRight: "10px",
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
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            🅿️ PayPal
          </button>
        </div>

        <button
          onClick={handleDonate}
          style={{
            width: "100%",
            background:
              method === "paypal"
                ? "linear-gradient(90deg,#ffc439,#f0a500)"
                : "linear-gradient(90deg,#7c3aed,#06b6d4)",
            color: "white",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          {method === "paypal" ? "Donate via PayPal 🅿️" : "Donate via Flutterwave 💳"}
        </button>
      </div>
    </div>
  );
}
