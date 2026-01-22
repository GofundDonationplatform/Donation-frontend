import React from "react";

export default function BankTransfer() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      color: "#fff"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "520px",
        background: "#0f172a",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
      }}>
        <h2 style={{ color: "#22d3ee", textAlign: "center" }}>
          Bank Transfer Details
        </h2>

        <p style={{ color: "#94a3b8", textAlign: "center", marginBottom: "16px" }}>
          Use the details below to complete your transfer.
        </p>

        <div style={{ lineHeight: "1.9", fontSize: "14px" }}>
          <div><strong>Account Holder:</strong> GFSSGA IMPACT NETWORK</div>
          <div><strong>Account Number:</strong> 214673810876</div>
          <div><strong>Bank Name:</strong> Lead Bank</div>
          <div><strong>Country Code:</strong> US</div>
          <div><strong>ACH Routing:</strong> 101019644</div>
          <div><strong>Wire Routing:</strong> 101019644</div>
          <div><strong>Bank Address:</strong> 1801 Main St., Kansas City, MO 64108</div>
          <div><strong>Account Type:</strong> Checking</div>
        </div>

        <p style={{ marginTop: "16px", fontSize: "12px", color: "#94a3b8" }}>
          After payment, please email your receipt to:
          <br />
          <strong>gofunddonationplatformhelpneed@gmail.com</strong>
        </p>
      </div>
    </div>
  );
}
