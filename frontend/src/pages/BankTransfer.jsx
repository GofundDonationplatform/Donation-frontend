import React from "react";
import { useNavigate } from "react-router-dom";

export default function BankTransfer() {
  const navigate = useNavigate();

  const BANK_DETAILS = {
    accountHolder: "GFSSGA IMPACT NETWORK",
    accountNumber: "214673810876",
    bankName: "Lead Bank",
    countryCode: "US",
    achRouting: "101019644",
    wireRouting: "101019644",
    bankAddress: "1801 Main St., Kansas City, MO 64108",
    accountType: "Checking",
    currency: "USD",
    reference: "Donor Name or Email",
    email: "support@gofund.com",
  };

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "24px" }}>
      <h2>Bank Transfer Details</h2>

      <p>Please make a transfer using the details below and email your proof of payment.</p>

      <div
        style={{
          background: "#f9f9f9",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          marginTop: "16px",
        }}
      >
        <p><strong>Account Holder:</strong> {BANK_DETAILS.accountHolder}</p>
        <p><strong>Account Number:</strong> {BANK_DETAILS.accountNumber}</p>
        <p><strong>Bank Name:</strong> {BANK_DETAILS.bankName}</p>
        <p><strong>Country Code:</strong> {BANK_DETAILS.countryCode}</p>
        <p><strong>ACH Routing:</strong> {BANK_DETAILS.achRouting}</p>
        <p><strong>Wire Routing:</strong> {BANK_DETAILS.wireRouting}</p>
        <p><strong>Bank Address:</strong> {BANK_DETAILS.bankAddress}</p>
        <p><strong>Account Type:</strong> {BANK_DETAILS.accountType}</p>
        <p><strong>Currency:</strong> {BANK_DETAILS.currency}</p>
        <p><strong>Reference:</strong> {BANK_DETAILS.reference}</p>

        <p style={{ marginTop: "12px" }}>
          After payment, email your receipt to:  
          <strong> {BANK_DETAILS.email}</strong>
        </p>
      </div>

      <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Back
        </button>

        <button
          onClick={() => alert("Thank you. We will verify your payment shortly.")}
          style={{
            padding: "10px 16px",
            borderRadius: "6px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          I’ve Paid
        </button>
      </div>
    </div>
  );
}
