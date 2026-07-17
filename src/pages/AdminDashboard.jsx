import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
  totalCampaigns: 0,
  activeCampaigns: 0,
  completedCampaigns: 0,
  pausedCampaigns: 0,
  totalRaised: 0,
  totalGoal: 0,
});

useEffect(() => {
  fetchDashboardStats();
}, []);

const fetchDashboardStats = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/dashboard"
    );

    setStats(res.data.stats);

  } catch (err) {
    console.error("Dashboard Error:", err);
  }
};

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
        padding: "30px",
      }}
    >
      <h1
        style={{
          color: "#22d3ee",
          fontSize: "42px",
          marginBottom: "5px",
        }}
      >
        Admin Dashboard
      </h1>

      <p
        style={{
          color: "#94a3b8",

          marginBottom: "30px",
        }}
      >
        Welcome back, <strong>{user?.name}</strong>
      </p>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
    marginBottom: "35px",
  }}
>

  <div style={{ background:"#0f172a", padding:"20px", borderRadius:"12px" }}>
    <h3 style={{ color:"#22d3ee" }}>Campaigns</h3>
    <h1>{stats.totalCampaigns}</h1>
  </div>

  <div style={{ background:"#0f172a", padding:"20px", borderRadius:"12px" }}>
    <h3 style={{ color:"#22d3ee" }}>Active</h3>
    <h1>{stats.activeCampaigns}</h1>
  </div>

  <div style={{ background:"#0f172a", padding:"20px", borderRadius:"12px" }}>
    <h3 style={{ color:"#22d3ee" }}>Paused</h3>
    <h1>{stats.pausedCampaigns}</h1>
  </div>

  <div style={{ background:"#0f172a", padding:"20px", borderRadius:"12px" }}>
    <h3 style={{ color:"#22d3ee" }}>Completed</h3>
    <h1>{stats.completedCampaigns}</h1>
  </div>

  <div style={{ background:"#0f172a", padding:"20px", borderRadius:"12px" }}>
    <h3 style={{ color:"#22d3ee" }}>Goal Amount</h3>
    <h1>${stats.totalGoal}</h1>
  </div>

  <div style={{ background:"#0f172a", padding:"20px", borderRadius:"12px" }}>
    <h3 style={{ color:"#22d3ee" }}>Raised</h3>
    <h1>${stats.totalRaised}</h1>
  </div>

  <div style={{ background:"#0f172a", padding:"20px", borderRadius:"12px" }}>
    <h3 style={{ color:"#22d3ee" }}>Average Goal</h3>
    <h1>${stats.averageGoal}</h1>
  </div>

  <div style={{ background:"#0f172a", padding:"20px", borderRadius:"12px" }}>
    <h3 style={{ color:"#22d3ee" }}>Completion</h3>
    <h1>{stats.completionRate}%</h1>
  </div>

</div>
      
      <div
        style={{
          background: "#0f172a",
          borderRadius: "12px",
          padding: "25px",
        }}
      >
        <h2
          style={{
            color: "#22d3ee",
            marginBottom: "20px",
          }}
        >
          Administration
        </h2>

        <div
          style={{
            display: "grid",
            gap: "15px",
          }}
        >
          <button
            onClick={() => navigate("/campaign-manager")}
            style={buttonStyle}
          >
            📢 Campaign Manager
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            style={buttonStyle}
          >
            👥 User Management
          </button>

          <button
            onClick={() => navigate("/admin/donations")}
            style={buttonStyle}
          >
           💰 Donation Management
          </button>

          <button
            style={buttonStyle}
          >
            ❤️ Digital Impact Supports
          </button>

          <button
            onClick={logout}
            style={{
              ...buttonStyle,
              background: "#dc2626",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
 );
}

const buttonStyle = {
  background: "#22d3ee",
  color: "#000",
  border: "none",
  borderRadius: "10px",
  padding: "15px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
};
