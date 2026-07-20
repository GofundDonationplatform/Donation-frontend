import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const CURRENCIES = {
  NGN: {
    code: "NGN",
    symbol: "₦",
    label: "Nigerian Naira",
    presets: [100, 250, 500, 1000, 3000, 6000, 12000],
  },
  USD: {
    code: "USD",
    symbol: "$",
    label: "US Dollar",
    presets: [2, 5, 10, 25, 50, 100, 250],
  },
};

export default function DonatePage() {
  const [currency, setCurrency] = useState("NGN");
  const [amount, setAmount] = useState(100);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [campaign, setCampaign] = useState(null);
  const [campaignLoading, setCampaignLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const campaignId = searchParams.get("campaign");

  const currencyConfig = useMemo(
    () => CURRENCIES[currency],
    [currency]
  );

  useEffect(() => {
    if (campaignId) {
      loadCampaign();
    }
  }, [campaignId]);

  useEffect(() => {
    setAmount(currency === "NGN" ? 100 : 2);
  }, [currency]);

  const loadCampaign = async () => {
    try {
      setCampaignLoading(true);

      const res = await axios.get(
        `${API_BASE}/api/campaigns/${campaignId}`
      );

      setCampaign(res.data.campaign);
    } catch (err) {
      console.error("Campaign loading failed:", err);
    } finally {
      setCampaignLoading(false);
    }
  };

  const validateForm = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return false;
    }

    if (!name.trim()) {
      alert("Please enter your name");
      return false;
    }

    if (!email.trim()) {
      alert("Please enter your email address");
      return false;
    }

    return true;
  };

  const handlePaystackPayment = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API_BASE}/api/paystack/initialize`,
        {
          amount: Number(amount),
          currency,
          email,
          name,
          campaignId,
        }
      );

      const paymentUrl =
        data?.data?.authorization_url ||
        data?.authorization_url;

      if (!paymentUrl) {
        throw new Error(
          "No Paystack authorization URL returned."
        );
      }

      window.location.assign(paymentUrl);
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err.message ||
        "Paystack initialization failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const goToBankTransfer = () => {
    navigate(
      campaignId
        ? `/bank-transfer?campaign=${campaignId}`
        : "/bank-transfer"
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
        padding: "30px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #0f172a, #312e81)",
            color: "#fff",
            borderRadius: "18px 18px 0 0",
            padding: "25px",
          }}
        >
          <button
            onClick={() =>
              campaignId
                ? navigate(`/campaign/${campaignId}`)
                : navigate("/home")
            }
            style={{
              background: "transparent",
              border: "none",
              color: "#cbd5e1",
              cursor: "pointer",
              fontWeight: "700",
              padding: 0,
              marginBottom: "18px",
            }}
          >
            ← Back
          </button>

          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: "900",
              marginBottom: "8px",
            }}
          >
            Support a Cause ❤️
          </h1>

          {campaignLoading && (
            <p
              style={{
                color: "#cbd5e1",
                fontSize: "14px",
              }}
            >
              Loading campaign...
            </p>
          )}

          {!campaignLoading && campaign && (
            <div
              style={{
                marginTop: "16px",
                padding: "14px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "#a5b4fc",
                  fontWeight: "800",
                  textTransform: "uppercase",
                }}
              >
                You are supporting
              </p>

              <h2
                style={{
                  marginTop: "5px",
                  fontSize: "1.15rem",
                  fontWeight: "900",
                }}
              >
                {campaign.title}
              </h2>
            </div>
          )}

          {!campaignLoading && !campaign && campaignId && (
            <p
              style={{
                color: "#fca5a5",
                fontSize: "13px",
              }}
            >
              Campaign information unavailable, but you can still continue.
            </p>
          )}

          {!campaignId && (
            <p
              style={{
                color: "#cbd5e1",
                fontSize: "14px",
              }}
            >
              Choose your preferred currency and support our digital impact mission.
            </p>
          )}
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "0 0 18px 18px",
            padding: "25px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, .08)",
            border: "1px solid #e2e8f0",
            borderTop: "none",
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "800",
              marginBottom: "7px",
            }}
          >
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "9px",
              border: "1px solid #cbd5e1",
              marginBottom: "16px",
              boxSizing: "border-box",
              fontSize: "14px",
            }}
          />

          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "800",
              marginBottom: "7px",
            }}
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "9px",
              border: "1px solid #cbd5e1",
              marginBottom: "20px",
              boxSizing: "border-box",
              fontSize: "14px",
            }}
          />

          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "800",
              marginBottom: "7px",
            }}
          >
            Preferred Currency
          </label>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "9px",
              border: "1px solid #cbd5e1",
              background: "#fff",
              color: "#0f172a",
              fontSize: "15px",
              marginBottom: "20px",
            }}
          >
            <option value="NGN">
              🇳🇬 NGN — Nigerian Naira
            </option>

            <option value="USD">
              🇺🇸 USD — US Dollar
            </option>
          </select>

          <div
            style={{
              fontSize: "13px",
              fontWeight: "800",
              marginBottom: "9px",
            }}
          >
            Select Amount ({currency})
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            {currencyConfig.presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                style={{
                  padding: "10px 6px",
                  borderRadius: "8px",
                  border:
                    amount === p
                      ? "2px solid #4f46e5"
                      : "1px solid #cbd5e1",
                  background:
                    amount === p
                      ? "#eef2ff"
                      : "#fff",
                  color:
                    amount === p
                      ? "#4338ca"
                      : "#334155",
                  fontWeight: "800",
                  cursor: "pointer",
                }}
              >
                {currencyConfig.symbol}
                {p.toLocaleString()}
              </button>
            ))}
          </div>

          <input
            type="number"
            value={amount}
            min={currency === "USD" ? "2" : "50"}
            step={currency === "USD" ? "0.01" : "1"}
            onChange={(e) =>
              setAmount(Number(e.target.value))
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "9px",
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
              fontSize: "15px",
              marginBottom: "20px",
            }}
          />

          <button
            onClick={handlePaystackPayment}
            disabled={loading}
            style={{
              width: "100%",
              background: loading
                ? "#94a3b8"
                : "#22c55e",
              color: "#000",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              fontWeight: "800",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              marginBottom: "10px",
            }}
          >
            {loading
              ? "Initializing..."
              : `Donate ${currencyConfig.symbol}${Number(amount || 0).toLocaleString()} with Paystack`}
          </button>

          <button
            onClick={() => navigate("/crypto")}
            style={{
              width: "100%",
              background: "#8b5cf6",
              color: "#fff",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              fontWeight: "700",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Crypto Donation
          </button>

          <button
            onClick={goToBankTransfer}
            style={{
              width: "100%",
              background: "#475569",
              color: "#fff",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Bank Transfer
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "11px",
              color: "#64748b",
              marginTop: "16px",
            }}
          >
            Payments are processed securely via Paystack.
          </p>
        </div>
      </div>
    </div>
  );
}
