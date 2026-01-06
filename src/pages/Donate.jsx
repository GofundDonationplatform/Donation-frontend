// src/pages/Donate.jsx
import React, { useState } from "react";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState(null);
  const [method, setMethod] = useState("flutterwave");
  const [loading, setLoading] = useState(false);

  // Gray Business
  const [showGrayModal, setShowGrayModal] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [grayDonationId, setGrayDonationId] = useState(null);

  const amounts = [200, 500, 1000, 2500, 5000, 10000];

  const backendURL =
    import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

  // -----------------------------
  // PAYMENT HANDLERS (same as before)
  // -----------------------------
  const handleFlutterwave = async () => { /* same as before */ };
  const handlePayPal = async () => { /* same as before */ };
  const handlePaystack = async () => { /* same as before */ };
  const handleDodoPay = async () => { /* same as before */ };
  const handleGrayInitiate = async () => { /* same as before */ };
  const handleReceiptUpload = (e) => setReceipt(e.target.files[0]);
  const confirmGrayPayment = async () => { /* same as before */ };

  const handleDonate = async () => {
    if (method === "flutterwave") return handleFlutterwave();
    if (method === "paypal") return handlePayPal();
    if (method === "paystack") return handlePaystack();
    if (method === "dodopay") return handleDodoPay();
    if (method === "gray") return handleGrayInitiate();
  };

  // -----------------------------
  // GRADIENTS PER PAYMENT METHOD
  // -----------------------------
  const getButtonGradient = (btnMethod) => {
    switch (btnMethod) {
      case "flutterwave":
        return method === "flutterwave"
          ? "linear-gradient(90deg,#7c3aed,#06b6d4)"
          : "rgba(255,255,255,0.1)";
      case "paypal":
        return method === "paypal"
          ? "linear-gradient(90deg,#ffc439,#f0a500)"
          : "rgba(255,255,255,0.1)";
      case "paystack":
        return method === "paystack"
          ? "linear-gradient(90deg,#0aa83f,#0dc263)"
          : "rgba(255,255,255,0.1)";
      case "dodopay":
        return method === "dodopay"
          ? "linear-gradient(90deg,#f43f5e,#fb7185)"
          : "rgba(255,255,255,0.1)";
      case "gray":
        return method === "gray"
          ? "linear-gradient(90deg,#4b5563,#9ca3af)"
          : "rgba(255,255,255,0.1)";
      default:
        return "rgba(255,255,255,0.1)";
    }
  };

  const getDonateGradient = () => {
    switch (method) {
      case "flutterwave":
        return "linear-gradient(90deg,#7c3aed,#06b6d4)";
      case "paypal":
        return "linear-gradient(90deg,#ffc439,#f0a500)";
      case "paystack":
        return "linear-gradient(90deg,#0aa83f,#0dc263)";
      case "dodopay":
        return "linear-gradient(90deg,#f43f5e,#fb7185)";
      case "gray":
        return "linear-gradient(90deg,#4b5563,#9ca3af)";
      default:
        return "linear-gradient(90deg,#7c3aed,#06b6d4)";
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#1e293b 0%,#475569 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 16px",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.1)",
        borderRadius: "16px",
        padding: "32px",
        maxWidth: "480px",
        width: "100%",
        color: "white",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        backdropFilter: "blur(8px)",
      }}>
        <h2 style={{ textAlign: "center" }}>Make a Donation 🌍</h2>

        {/* AMOUNTS */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {amounts.map((amt, i) => (
            <button
              key={i}
              onClick={() => { setSelected(i); setAmount(amt); }}
              style={{
                flex: "1 1 30%",
                background: selected === i
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
          onChange={(e) => { setAmount(e.target.value); setSelected(null); }}
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginTop: "20px" }}>
          <button
            onClick={() => setMethod("flutterwave")}
            style={{ padding: "12px", borderRadius: "8px", background: getButtonGradient("flutterwave") }}
          >
            🌐 Flutterwave
          </button>
          <button
            onClick={() => setMethod("paypal")}
            style={{ padding: "12px", borderRadius: "8px", background: getButtonGradient("paypal") }}
          >
            🅿️ PayPal
          </button>
          <button
            onClick={() => setMethod("paystack")}
            style={{ padding: "12px", borderRadius: "8px", background: getButtonGradient("paystack") }}
          >
            💳 Paystack
          </button>
          <button
            onClick={() => setMethod("dodopay")}
            style={{ padding: "12px", borderRadius: "8px", background: getButtonGradient("dodopay") }}
          >
            🟣 DodoPay
          </button>
          <button
            onClick={() => setMethod("gray")}
            style={{ padding: "12px", borderRadius: "8px", background: getButtonGradient("gray") }}
          >
            🏦 Gray Business
          </button>
        </div>

        {/* DONATE BUTTON */}
        <button
          onClick={handleDonate}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "25px",
            padding: "14px",
            borderRadius: "10px",
            fontWeight: "700",
            background: getDonateGradient(),
          }}
        >
          {method === "flutterwave"
            ? "Donate via Flutterwave 🌐"
            : method === "paypal"
            ? "Donate via PayPal 🅿️"
            : method === "paystack"
            ? "Donate via Paystack 💳"
            : method === "dodopay"
            ? "Donate via DodoPay 🟣"
            : "Donate via Gray Business 🏦"}
        </button>
      </div>

      {/* GRAY BUSINESS MODAL */}
      {showGrayModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            maxWidth: "500px",
            width: "90%",
          }}>
            <h2>Gray Business Payment Details</h2>
            <p>ACCOUNT HOLDER: GFSSGA IMPACT NETWORK</p>
            <p>ACCOUNT NUMBER: 214673810876</p>
            <p>BANK NAME: Lead Bank</p>
            <p>COUNTRY CODE: US</p>
            <p>ACH ROUTING: 101019644</p>
            <p>WIRE ROUTING: 101019644</p>
            <p>BANK ADDRESS: 1801 Main St., Kansas City, MO 64108</p>
            <p>ACCOUNT TYPE: Checking</p>

            <hr style={{ margin: "16px 0" }} />

            <label>
              Upload receipt (optional):
              <input type="file" onChange={handleReceiptUpload} />
            </label>

            <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
              <button
                onClick={confirmGrayPayment}
                style={{ flex: 1, padding: "12px", background: "green", color: "white" }}
              >
                I’ve Completed Payment
              </button>
              <button
                onClick={() => setShowGrayModal(false)}
                style={{ flex: 1, padding: "12px", background: "red", color: "white" }}
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
