import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DonateSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your donation...");

  const backendBase =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference");

      if (!reference) {
        setMessage("No payment reference found.");
        return;
      }

      try {
        const res = await axios.get(
          `${backendBase}/api/paystack/verify?reference=${reference}`
        );

        if (res.data?.data?.status === "success") {
          setMessage("🎉 Thank you! Your donation was verified successfully.");
        } else {
          setMessage("Payment verification failed.");
        }
      } catch (err) {
        console.error(err);
        setMessage("Unable to verify payment.");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>{message}</h1>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Back Home
      </button>
    </div>
  );
}
