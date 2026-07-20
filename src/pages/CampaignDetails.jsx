import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCampaign();
  }, [id]);

  const loadCampaign = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${API_BASE}/api/campaigns/${id}`
      );

      setCampaign(res.data.campaign);
    } catch (err) {
      console.error("Campaign loading failed:", err);
      setError("Campaign could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount, currency = "USD") =>
    `${currency} ${Number(amount || 0).toLocaleString()}`;

  const getProgress = () => {
    if (!campaign?.goalAmount || campaign.goalAmount <= 0) {
      return 0;
    }

    return Math.min(
      (campaign.amountRaised / campaign.goalAmount) * 100,
      100
    );
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8fafc",
          color: "#475569",
          fontSize: "18px",
          fontWeight: "700",
        }}
      >
        Loading campaign...
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8fafc",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#0f172a" }}>
          Campaign unavailable
        </h2>

        <p style={{ color: "#64748b", marginTop: "8px" }}>
          {error || "This campaign could not be found."}
        </p>

        <button
          onClick={() => navigate("/home")}
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            border: "none",
            borderRadius: "9px",
            background: "#4f46e5",
            color: "#fff",
            fontWeight: "800",
            cursor: "pointer",
          }}
        >
          Back to Campaigns
        </button>
      </div>
    );
  }

  const progress = getProgress();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
      }}
    >
      {/* TOP BAR */}
      <header
        style={{
          background: "#0f172a",
          color: "#fff",
          padding: "16px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong
            style={{
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/home")}
          >
            GFSSGA Impact Network
          </strong>

          <button
            onClick={() => navigate("/home")}
            style={{
              background: "transparent",
              color: "#cbd5e1",
              border: "1px solid #475569",
              borderRadius: "8px",
              padding: "8px 14px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Explore Campaigns
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "35px 20px 70px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(300px, .8fr)",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* CAMPAIGN STORY */}
          <section>
            {campaign.image ? (
              <img
                src={`${API_BASE}${campaign.image}`}
                alt={campaign.title}
                style={{
                  width: "100%",
                  height: "420px",
                  objectFit: "cover",
                  borderRadius: "18px",
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "420px",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg, #312e81, #0891b2)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "5rem",
                }}
              >
                ❤️
              </div>
            )}

            <div style={{ marginTop: "25px" }}>
              <span
                style={{
                  display: "inline-block",
                  background: "#eef2ff",
                  color: "#4338ca",
                  padding: "6px 11px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: "800",
                }}
              >
                {campaign.category || "General"}
              </span>

              <h1
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  lineHeight: "1.1",
                  fontWeight: "900",
                  marginTop: "14px",
                }}
              >
                {campaign.title}
              </h1>

              <p
                style={{
                  marginTop: "18px",
                  color: "#475569",
                  fontSize: "17px",
                  lineHeight: "1.8",
                  whiteSpace: "pre-line",
                }}
              >
                {campaign.description}
              </p>
            </div>
          </section>

          {/* FUNDING CARD */}
          <aside
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "24px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 30px rgba(15, 23, 42, .08)",
              position: "sticky",
              top: "20px",
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "900",
                color: "#0f172a",
              }}
            >
              {formatCurrency(campaign.amountRaised, campaign.currency)}
            </div>

            <p
              style={{
                color: "#64748b",
                marginTop: "5px",
              }}
            >
              raised of {formatCurrency(campaign.goalAmount, campaign.currency)} goal
            </p>

            <div
              style={{
                marginTop: "18px",
                height: "12px",
                background: "#e2e8f0",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #4f46e5, #06b6d4)",
                  borderRadius: "999px",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
                fontSize: "13px",
                fontWeight: "800",
              }}
            >
              <span>{progress.toFixed(0)}% funded</span>

              <span style={{ color: "#64748b" }}>
                {campaign.donorCount || 0} donors
              </span>
            </div>

            <button
              onClick={() =>
                navigate(`/donate?campaign=${campaign._id}`)
              }
              style={{
                width: "100%",
                marginTop: "24px",
                padding: "15px",
                border: "none",
                borderRadius: "10px",
                background: "#4f46e5",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "900",
                cursor: "pointer",
              }}
            >
              Donate Now ❤️
            </button>

            <p
              style={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "12px",
                marginTop: "12px",
              }}
            >
              Your support helps move this campaign forward.
            </p>
          </aside>
        </div>
      </main>

      <footer
        style={{
          background: "#0f172a",
          color: "#94a3b8",
          textAlign: "center",
          padding: "25px 20px",
          fontSize: "13px",
        }}
      >
        © 2026 GFSSGA Impact Network. All rights reserved.
      </footer>
    </div>
  );
}
