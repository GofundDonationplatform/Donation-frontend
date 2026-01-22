import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DonatePage() {
  const presets = [100, 250, 500, 1000, 3000, 6000, 12000];
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backendBase = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const validateAmount = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return false;
    }
    return true;
  };

  const handlePayment = async (gateway) => {
    if (!validateAmount()) return;
    setLoading(true);
    try {
      let endpoint = "";
      let payload = { amount };

      switch (gateway) {
        case "flutterwave":
          endpoint = "/api/flutterwave/init";
          break;
        case "paystack":
          endpoint = "/api/paystack/init";
          break;
        case "paypal":
          endpoint = "/api/paypal/init";
          break;
        case "dodopay":
          endpoint = "/api/dodopay/init";
          break;
        default:
          return;
      }

      const res = await axios.post(`${backendBase}${endpoint}`, payload);

      // Redirect based on gateway
      switch (gateway) {
        case "flutterwave":
          if (res.data.link) window.location.href = res.data.link;
          else alert("Flutterwave link unavailable");
          break;
        case "paystack":
          if (res.data.authorization_url) window.location.href = res.data.authorization_url;
          else alert("Paystack link unavailable");
          break;
        case "paypal":
          if (res.data.approvalUrl) window.location.href = res.data.approvalUrl;
          else alert("PayPal link unavailable");
          break;
        case "dodopay":
          if (res.data.checkout_url) window.location.href = res.data.checkout_url;
          else alert("DodoPay link unavailable");
          break;
      }
    } catch (err) {
      alert(`${gateway.charAt(0).toUpperCase() + gateway.slice(1)} initialization failed`);
    } finally {
      setLoading(false);
    }
  };

  const goToBankTransfer = () => {
    navigate("/bank-transfer");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "#0f172a",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        color: "#fff"
      }}>

        <h2 style={{
          textAlign: "center",
          fontSize: "22px",
          marginBottom: "6px",
          color: "#22d3ee"
        }}>
          Support a Digital Impact
        </h2>

        <p style={{
          textAlign: "center",
          fontSize: "13px",
          color: "#94a3b8",
          marginBottom: "18px"
        }}>
          Select an amount and continue securely
        </p>

        <div style={{ marginBottom: "16px" }}>
          <div style={{ marginBottom: "8px", fontSize: "13px", color: "#cbd5f5" }}>
            Select Amount
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            marginBottom: "10px"
          }}>
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                style={{
                  padding: "8px",
                  borderRadius: "8px",
                  border: "none",
                  background: amount === p ? "#22d3ee" : "#1e293b",
                  color: amount === p ? "#000" : "#e5e7eb",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                ${p.toLocaleString()}
              </button>
            ))}
          </div>

          <input
            type="number"
            value={amount}
            min="1"
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #334155",
              background: "#020617",
              color: "#fff"
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={() => handlePayment("flutterwave")}
            disabled={loading}
            style={{ background: "#f97316", color: "#000", padding: "10px", borderRadius: "10px", border: "none", fontWeight: "700" }}
          >
            Pay with Flutterwave
          </button>

          <button
            onClick={() => handlePayment("paystack")}
            disabled={loading}
            style={{ background: "#22c55e", color: "#000", padding: "10px", borderRadius: "10px", border: "none", fontWeight: "700" }}
          >
            Pay with Paystack
          </button>

          <button
            onClick={() => handlePayment("paypal")}
            disabled={loading}
            style={{ background: "#3b82f6", color: "#fff", padding: "10px", borderRadius: "10px", border: "none", fontWeight: "700" }}
          >
            Pay with PayPal
          </button>

          <button
            onClick={() => handlePayment("dodopay")}
            disabled={loading}
            style={{ background: "#a855f7", color: "#fff", padding: "10px", borderRadius: "10px", border: "none", fontWeight: "700" }}
          >
            Pay with DodoPay
          </button>

          <button
            onClick={goToBankTransfer}
            style={{ background: "#475569", color: "#fff", padding: "10px", borderRadius: "10px", border: "none", fontWeight: "700" }}
          >
            Bank Transfer
          </button>
        </div>

        <p style={{
          textAlign: "center",
          fontSize: "11px",
          color: "#94a3b8",
          marginTop: "16px"
        }}>
          Payments are processed securely via third-party gateways.
        </p>

      </div>
    </div>
  );
}
