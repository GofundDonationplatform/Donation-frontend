import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);

  const backendBase =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
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
    }
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
        Total Donations: <strong>{donations.length}</strong>
      </p>

      <div
        style={{
          marginTop: "25px",
          background: "#0f172a",
          padding: "20px",
          borderRadius: "12px",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px", textAlign: "left" }}>Donor</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Amount</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Method</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((donation) => (
              <tr
                key={donation._id}
                style={{
                  borderTop: "1px solid #1e293b",
                }}
              >
                <td style={{ padding: "10px" }}>
                  {donation.name}
                </td>

                <td style={{ padding: "10px" }}>
                  {donation.email}
                </td>

                <td style={{ padding: "10px" }}>
                  ₦{donation.amount}
                </td>

                <td style={{ padding: "10px" }}>
                  {donation.status}
                </td>

                <td style={{ padding: "10px" }}>
                  {donation.method}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
