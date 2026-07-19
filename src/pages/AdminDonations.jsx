import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const backendBase =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${backendBase}/api/donations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDonations(res.data.donations || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Unable to load donations right now."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredDonations = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return donations;

    return donations.filter((donation) => {
      const name = donation.name?.toLowerCase() || "";
      const email = donation.email?.toLowerCase() || "";
      const method = donation.method?.toLowerCase() || "";
      const status = donation.status?.toLowerCase() || "";

      return (
        name.includes(query) ||
        email.includes(query) ||
        method.includes(query) ||
        status.includes(query)
      );
    });
  }, [donations, search]);

  const statusStyle = (status) => {
    if (status === "completed") {
      return {
        background: "#166534",
        color: "#bbf7d0",
      };
    }

    if (status === "rejected") {
      return {
        background: "#991b1b",
        color: "#fecaca",
      };
    }

    return {
      background: "#854d0e",
      color: "#fef08a",
    };
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
      <h1 style={{ color: "#22d3ee" }}>
        💰 Donation Management
      </h1>

      <p style={{ color: "#94a3b8" }}>
        Showing{" "}
        <strong>{filteredDonations.length}</strong>{" "}
        of{" "}
        <strong>{donations.length}</strong>{" "}
        donations
      </p>

      <input
        type="text"
        placeholder="🔍 Search donor, email, method, or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "600px",
          marginTop: "20px",
          padding: "14px 16px",
          borderRadius: "10px",
          border: "1px solid #334155",
          background: "#0f172a",
          color: "#fff",
          fontSize: "16px",
          outline: "none",
        }}
      />

      <div
        style={{
          marginTop: "25px",
          background: "#0f172a",
          padding: "20px",
          borderRadius: "12px",
          overflowX: "auto",
        }}
      >
        {loading && (
          <p style={{ color: "#22d3ee" }}>
            Loading donations...
          </p>
        )}

        {!loading && error && (
          <div>
            <p style={{ color: "#f87171" }}>
              ⚠️ {error}
            </p>

            <button
              onClick={loadDonations}
              style={{
                marginTop: "10px",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                background: "#22d3ee",
                color: "#020617",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && donations.length === 0 && (
          <p style={{ color: "#94a3b8" }}>
            📭 No donations have been recorded yet.
          </p>
        )}

        {!loading &&
          !error &&
          donations.length > 0 &&
          filteredDonations.length === 0 && (
            <p style={{ color: "#94a3b8" }}>
              🔍 No donations match your search.
            </p>
          )}

        {!loading &&
          !error &&
          filteredDonations.length > 0 && (
            <table
              style={{
                width: "100%",
                minWidth: "760px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>Donor</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Method</th>
                </tr>
              </thead>

              <tbody>
                {filteredDonations.map((donation) => (
                  <tr
                    key={donation._id}
                    style={{
                      borderTop: "1px solid #1e293b",
                    }}
                  >
                    <td style={tdStyle}>
                      {donation.name || "Anonymous"}
                    </td>

                    <td style={tdStyle}>
                      {donation.email || "No email"}
                    </td>

                    <td style={tdStyle}>
                      {donation.currency || "USD"}{" "}
                      {Number(donation.amount || 0).toLocaleString()}
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          ...statusStyle(donation.status),
                          padding: "5px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "700",
                          textTransform: "capitalize",
                        }}
                      >
                        {donation.status || "pending"}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: "5px 10px",
                          borderRadius: "999px",
                          background: "#1e293b",
                          color: "#cbd5e1",
                          fontSize: "12px",
                          textTransform: "capitalize",
                        }}
                      >
                        {donation.method || "unknown"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
}

const thStyle = {
  padding: "12px 10px",
  textAlign: "left",
  color: "#22d3ee",
};

const tdStyle = {
  padding: "12px 10px",
};
