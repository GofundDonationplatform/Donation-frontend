import React from "react";
import { Link } from "react-router-dom";

export default function CryptoDonation() {
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
            color: "#22d3ee",
            marginBottom: "15px",
          }}
        >
          Crypto Donation
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "20px",
          }}
        >
          Support our mission using cryptocurrency.
        </p>

        <div
          style={{
            background: "#020617",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid #334155",
            marginBottom: "15px",
          }}
        >
          <h3 style={{ color: "#22c55e" }}>
            USDT (TRC20) - Recommended
          </h3>

          <p>
            <strong>Network:</strong> TRON (TRC20)
          </p>

          <p
            style={{
              wordBreak: "break-all",
              color: "#cbd5e1",
            }}
          >
            TGZBf16hZhFH5MARpssBvq4donG67iRVGb
          </p>
        </div>

        <div
          style={{
            background: "#020617",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid #334155",
            marginBottom: "15px",
          }}
        >
          <h3 style={{ color: "#60a5fa" }}>
            USDC (Solana)
          </h3>

          <p>
            <strong>Network:</strong> Solana
          </p>

          <p
            style={{
              wordBreak: "break-all",
              color: "#cbd5e1",
            }}
          >
            2TiPFJrJg1GMbMXjSuhDmGvcqtiwC6KR6QxDZgutQ92R
          </p>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontSize: "14px",
          }}
        >
          <strong>Important:</strong>
          <ul>
            <li>Send only USDT to the USDT wallet.</li>
            <li>Send only USDC to the USDC wallet.</li>
            <li>Use the correct network.</li>
            <li>Wrong-network transfers may be unrecoverable.</li>
          </ul>
        </div>

        <Link
          to="/donate"
          style={{
            display: "block",
            textAlign: "center",
            background: "#22d3ee",
            color: "#000",
            padding: "12px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          Back to Donations
        </Link>
      </div>
    </div>
  );
}
