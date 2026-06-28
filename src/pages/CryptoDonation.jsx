import React from "react";
import { Link } from "react-router-dom";

const usdtAddress = "TGZBf16hZhFH5MARpssBvq4donG67iRVGb";
const usdcAddress = "2TiPFJrJg1GMbMXjSuhDmGvcqtiwC6KR6QxDZgutQ92R";

export default function CryptoDonation() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Wallet address copied successfully!");
  };

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
          maxWidth: "650px",
          background: "#0f172a",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,.5)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#22d3ee",
            marginBottom: "8px",
          }}
        >
          Crypto Donation
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Support our mission by donating with cryptocurrency.
        </p>

        {/* USDT */}

        <div
          style={{
            background: "#020617",
            border: "1px solid #334155",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "25px",
          }}
        >
          <h3 style={{ color: "#22d3ee" }}>USDT (TRC20)</h3>

          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <img
              src="/images/crypto/usdt-trc20.png"
              alt="USDT QR"
              style={{
                width: "220px",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>

          <p
            style={{
              wordBreak: "break-all",
              fontSize: "14px",
            }}
          >
            {usdtAddress}
          </p>

          <button
            onClick={() => copyToClipboard(usdtAddress)}
            style={{
              width: "100%",
              padding: "10px",
              background: "#22d3ee",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Copy USDT Address
          </button>
        </div>

        {/* USDC */}

        <div
          style={{
            background: "#020617",
            border: "1px solid #334155",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h3 style={{ color: "#22d3ee" }}>USDC (Solana)</h3>

          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <img
              src="/images/crypto/usdc-sol.png"
              alt="USDC QR"
              style={{
                width: "220px",
                maxWidth: "100%",
                borderRadius: "10px",
              }}
            />
          </div>

          <p
            style={{
              wordBreak: "break-all",
              fontSize: "14px",
            }}
          >
            {usdcAddress}
          </p>

          <button
            onClick={() => copyToClipboard(usdcAddress)}
            style={{
              width: "100%",
              padding: "10px",
              background: "#22d3ee",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Copy USDC Address
          </button>
        </div>

        <div style={{ marginTop: "30px" }}>
          <Link
            to="/donate"
            style={{
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              background: "#475569",
              color: "#fff",
              padding: "12px",
              borderRadius: "10px",
              fontWeight: "700",
            }}
          >
            ← Back to Donate
          </Link>
        </div>
      </div>
    </div>
  );
}
