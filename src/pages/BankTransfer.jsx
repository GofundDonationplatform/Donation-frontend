// src/pages/BankTransfer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function BankTransfer() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "550px",
          background: "#0f172a",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "22px",
            marginBottom: "10px",
            color: "#22d3ee",
          }}
        >
          Bank Transfer Donation
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#94a3b8",
            marginBottom: "18px",
          }}
        >
          Please use the banking details below to support our mission.
        </p>

        <div
          style={{
            background: "#020617",
            borderRadius: "12px",
            padding: "16px",
            border: "1px solid #334155",
            marginBottom: "16px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <strong>Account Holder:</strong> GFSSGA IMPACT NETWORK
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Account Number:</strong> 214673810876
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Bank Name:</strong> Lead Bank
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Country:</strong> United States (US)
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>ACH Routing:</strong> 101019644
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Wire Routing:</strong> 101019644
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Account Type:</strong> Checking
          </div>

          <div style={{ marginBottom: "10px" }}>
            <strong>Bank Address:</strong>
            <br />
            1801 Main St.
            <br />
            Kansas City, MO 64108
            <br />
            United States
          </div>
        </div>

        <div
          style={{
            background: "#111827",
            border: "1px solid #374151",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "18px",
          }}
        >
          <h3
            style={{
              color: "#22d3ee",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Crypto Donations (Coming Soon)
          </h3>

          <p
            style={{
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "13px",
            }}
          >
            USDT and USDC donation wallets will be added soon.
          </p>
        </div>

        <p
          style={{
            fontSize: "12px",
            color: "#94a3b8",
            marginBottom: "18px",
            textAlign: "center",
          }}
        >
          After making payment, please send proof of payment to:
          <br />
          <strong>support@gofundss.com</strong>
        </p>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            to="/donate"
            style={{
              flex: 1,
              background: "#475569",
              color: "#fff",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Back
          </Link>

          <Link
            to="/donate-success"
            style={{
              flex: 1,
              background: "#22d3ee",
              color: "#000",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            I've Paid
          </Link>
        </div>
      </div>
    </div>
  );
}
