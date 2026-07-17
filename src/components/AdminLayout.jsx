import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLayout({ title, children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#0f172a",
          padding: "18px",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <h2
          style={{
            color: "#22d3ee",
            margin: 0,
          }}
        >
          GoFund Digital Impact Support
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "6px",
          }}
        >
          Admin Control Panel
        </p>
      </div>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "10px",
          padding: "15px",
          background: "#071021",
        }}
      >
        <button onClick={() => navigate("/admin/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/campaign-manager")}>
          Campaigns
        </button>

        <button onClick={() => navigate("/admin/users")}>
          Users
        </button>

        <button>
          Donations
        </button>

        <button
          onClick={logout}
          style={{
            background: "#dc2626",
            color: "#fff",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ padding: "25px" }}>
        <h1 style={{ color: "#22d3ee" }}>{title}</h1>

        {children}
      </div>
    </div>
  );
}
