// src/pages/Support.jsx
import React, { useState } from "react";

export default function Support() {
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState(null);
  const [method, setMethod] = useState("flutterwave");
  const [showGrayModal, setShowGrayModal] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const amounts = [200, 500, 1000, 2500, 5000, 10000];

  const backendURL =
    import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

  // ==========================
  // PAYMENT HANDLERS
  // ==========================
  const handleDodoPay = async () => {
    if (!amount) return alert("Please select or enter a support amount");

    try {
      const res = await fetch(`${backendURL}/api/dodopay/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          email: "supporter@example.com",
          name: "Supporter Name",
        }),
      });

      const data = await res.json();
      if (!data.checkout_url) return alert("DodoPay checkout failed");

      window.location.href = data.checkout_url;
    } catch (err) {
      console.error(err);
      alert("Error starting DodoPay checkout");
    }
  };

  const handlePaystack = async () => {
    if (!amount) return alert("Please select or enter a support amount");

    try {
      const res = await fetch(`${backendURL}/api/paystack/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          email: "supporter@example.com",
          name: "Supporter Name",
          currency: "USD",
        }),
      });

      const data = await res.json();
      if (data?.authorization_url) window.location.href = data.authorization_url;
      else alert("Paystack checkout failed");
    } catch (err) {
      console.error(err);
      alert("Error starting Paystack checkout");
    }
  };

  const handlePayPal = async () => {
    if (!amount) return alert("Please select or enter a support amount");

    try {
      const res = await fetch(`${backendURL}/api/paypal/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      const data = await res.json();
      if (data?.id) window.location.href = `https://www.paypal.com/checkoutnow?token=${data.id}`;
      else alert("PayPal checkout failed");
    } catch (err) {
      console.error(err);
      alert("Error starting PayPal checkout");
    }
  };

  const handleFlutterwave = async () => {
    if (!amount) return alert("Please select or enter a support amount");

    try {
      const res = await fetch(`${backendURL}/api/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          name: "Supporter Name",
          email: "supporter@example.com",
          currency: "USD",
        }),
      });

      const data = await res.json();
      if (data?.link) window.location.href = data.link;
      else alert("Flutterwave checkout failed");
    } catch (err) {
      console.error(err);
      alert("Error starting Flutterwave checkout");
    }
  };

  // ==========================
  // MAIN ACTION BUTTON
  // ==========================
  const handleSupport = async () => {
    if (!amount) return alert("Please select or enter a support amount");

    if (method === "dodopay") return handleDodoPay();
    if (method === "paystack") return handlePaystack();
    if (method === "paypal") return handlePayPal();
    if (method === "flutterwave") return handleFlutterwave();
    if (method === "gray") return setShowGrayModal(true);
  };

  // ==========================
  // GRAY / BANK TRANSFER HANDLER
  // ==========================
  const handleReceiptUpload = (e) => setReceipt(e.target.files[0]);

  const confirmGrayPayment = async () => {
    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("payment_method", "gray");
      if (receipt) formData.append("receipt", receipt);

      const res = await fetch(`${backendURL}/api/gray/confirm`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data?.success) {
        alert("Thank you! Your digital impact support has been recorded.");
        setShowGrayModal(false);
      } else {
        alert("Unable to confirm payment. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error confirming bank transfer.");
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
        <h2 style={{ textAlign: "center" }}>
          Support Our Digital Impact 🌍
        </h2>

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
          placeholder="Enter custom support amount"
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
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button onClick={() => setMethod("flutterwave")}>🌐 Digital Support</button>
          <button onClick={() => setMethod("paypal")}>🅿️ Digital Support</button>
          <button onClick={() => setMethod("paystack")}>💳 Digital Support</button>
          <button onClick={() => setMethod("dodopay")}>🟣 Digital Impact Support</button>
          <button onClick={() => setMethod("gray")}>🏦 Bank Transfer Support</button>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={handleSupport}
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "14px",
            borderRadius: "10px",
            fontWeight: "700",
            background:
              method === "dodopay"
                ? "linear-gradient(90deg,#f43f5e,#fb7185)"
                : "linear-gradient(90deg,#7c3aed,#06b6d4)",
          }}
        >
          Proceed with Digital Support
        </button>
      </div>

      {/* GRAY MODAL */}
      {showGrayModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              maxWidth: "500px",
              width: "90%",
            }}
          >
            <h2>Bank Transfer – Digital Impact Support</h2>
            <p><b>Account Holder:</b> GFSSGA IMPACT NETWORK</p>
            <p><b>Account Number:</b> 214673810876</p>
            <p><b>Bank:</b> Lead Bank</p>
            <p><b>Country:</b> United States</p>
            <p><b>ACH Routing:</b> 101019644</p>
            <p><b>Wire Routing:</b> 101019644</p>

            <hr />

            <label>
              Upload receipt (optional):
              <input type="file" onChange={handleReceiptUpload} />
            </label>

            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              <button
                onClick={confirmGrayPayment}
                style={{ flex: 1, background: "green", color: "white", padding: "12px" }}
              >
                I’ve Completed My Digital Impact Support
              </button>

              <button
                onClick={() => setShowGrayModal(false)}
                style={{ flex: 1, background: "red", color: "white", padding: "12px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
