import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminLayout({ title, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/");
  };

  const navItems = [
    ["📊 Dashboard", "/admin/dashboard"],
    ["📢 Campaigns", "/campaign-manager"],
    ["👥 Users", "/admin/users"],
    ["💰 Donations", "/admin/donations"],
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#fff",
      }}
    >
      <header
        style={{
          background: "#0f172a",
          padding: "18px 25px",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <h2 style={{ color: "#22d3ee", margin: 0 }}>
          GoFund Digital Impact Support
        </h2>

        <p style={{ color: "#94a3b8", margin: "6px 0 0" }}>
          Admin Control Panel
        </p>
      </header>

      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          padding: "15px 25px",
          background: "#071021",
          borderBottom: "1px solid #1e293b",
        }}
      >
        {navItems.map(([label, path]) => {
          const active = location.pathname === path;

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "1px solid #334155",
                background: active ? "#22d3ee" : "#0f172a",
                color: active ? "#020617" : "#cbd5e1",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          );
        })}

        <button
          onClick={logout}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#dc2626",
            color: "#fff",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          🚪 Logout
        </button>
      </nav>

      <main style={{ padding: "25px" }}>
        {title && (
          <h1 style={{ color: "#22d3ee", marginTop: 0 }}>
            {title}
          </h1>
        )}

        {children}
      </main>
    </div>
  );
}
