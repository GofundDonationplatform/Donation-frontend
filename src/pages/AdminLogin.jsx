import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE } from "../config";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await axios.post(
        `${API_BASE}/api/admin/login`,
        form
      );

      console.log("ADMIN LOGIN SUCCESS:", res.data);

      const admin = res.data.admin;
      const token = res.data.token;

      if (!token || !admin) {
        throw new Error("Invalid admin login response");
      }

      // Clear any previous ordinary-user session.
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");

      // Establish the admin session.
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...admin,
          role: "admin",
          isAdmin: true,
        })
      );
      localStorage.setItem("role", "admin");

      // If the admin was redirected here by a protected
      // admin page, return there. Otherwise use dashboard.
      const destination =
        location.state?.from &&
        location.state.from.startsWith("/admin/")
          ? location.state.from
          : "/admin/dashboard";

      navigate(destination, { replace: true });
    } catch (error) {
      console.error("ADMIN LOGIN ERROR:", error);

      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Admin login failed.";

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>Admin Login</h2>

        <p className="admin-login-subtitle">
          Sign in with your administrator credentials to access
          the administration dashboard.
        </p>

        {errorMessage && (
          <div
            style={{
              marginBottom: "15px",
              padding: "10px 12px",
              borderRadius: "8px",
              background: "#fee2e2",
              color: "#991b1b",
            }}
          >
            {errorMessage}
          </div>
        )}

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Admin Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Admin Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
