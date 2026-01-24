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
          maxWidth: "480px",
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
          Bank Transfer Details
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#94a3b8",
            marginBottom: "18px",
          }}
        >
          Please make a transfer using the details below and email your proof of
          payment.
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
            <strong>Bank Name:</strong> Example Bank
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Account Name:</strong> GoFund Digital Impact Support
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Account Number:</strong> 1234567890
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Currency:</strong> USD / NGN
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Reference:</strong> Your Name or Email
          </div>
        </div>

        <p
          style={{
            fontSize: "12px",
            color: "#94a3b8",
            marginBottom: "18px",
            textAlign: "center",
          }}
        >
          After payment, email your receipt to:
          <br />
          <strong>support@gofund.com</strong>
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
            I’ve Paid
          </Link>
        </div>
      </div>
    </div>
  );
}
