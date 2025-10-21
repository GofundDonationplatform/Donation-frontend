import React from "react";
import { useNavigate } from "react-router-dom";

export default function DonateSuccess() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #06b6d4 0%, #7c3aed 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.1)",
          padding: "40px",
          borderRadius: "20px",
          maxWidth: "500px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "16px" }}>
          🎉 Thank You!
        </h1>
        <p style={{ fontSize: "18px", lineHeight: "1.6", marginBottom: "24px" }}>
          Your donation has been received successfully.  
          Your kindness helps make the world a better place 🌍💖
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "white",
            color: "#7c3aed",
            padding: "12px 24px",
            borderRadius: "10px",
            border: "none",
            fontWeight: "700",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1.0)")}
        >
          Back to Home 🏠
        </button>
      </div>
    </div>
  );
}
