import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/campaigns`);

      const visibleCampaigns = (res.data.campaigns || []).filter(
        (campaign) =>
          campaign.status === "Approved" ||
          campaign.status === "Active" ||
          campaign.status === "Completed"
      );

      setCampaigns(visibleCampaigns);
    } catch (err) {
      console.error("Campaign loading failed:", err);
      setError("Unable to load campaigns right now.");
    } finally {
      setLoading(false);
    }
  };

  const getProgress = (campaign) => {
    if (!campaign.goalAmount || campaign.goalAmount <= 0) return 0;

    return Math.min(
      (campaign.amountRaised / campaign.goalAmount) * 100,
      100
    );
  };

  const formatCurrency = (amount, currency = "USD") =>
    `${currency} ${Number(amount || 0).toLocaleString()}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
      }}
    >
      {/* HERO */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #312e81 100%)",
          color: "#fff",
          padding: "80px 20px 70px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              color: "#22d3ee",
              fontWeight: "800",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontSize: "13px",
              marginBottom: "14px",
            }}
          >
            GFSSGA Impact Network
          </p>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.2rem)",
              lineHeight: "1.05",
              fontWeight: "900",
              marginBottom: "20px",
            }}
          >
            Together, we can change someone's story.
          </h1>

          <p
            style={{
              maxWidth: "680px",
              margin: "0 auto 30px",
              color: "#cbd5e1",
              fontSize: "1.1rem",
              lineHeight: "1.7",
            }}
          >
            Discover meaningful causes, support verified campaigns, and help
            create real impact through education, women empowerment, and child
            welfare.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("campaigns")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "#22d3ee",
              color: "#020617",
              border: "none",
              borderRadius: "10px",
              padding: "14px 28px",
              fontWeight: "800",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Explore Campaigns
          </button>
        </div>
      </section>

      {/* CAMPAIGNS */}
      <main
        id="campaigns"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "55px 20px 80px",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <p
            style={{
              color: "#4f46e5",
              fontWeight: "800",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Make an impact
          </p>

          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "900",
              marginTop: "6px",
            }}
          >
            Support a campaign
          </h2>

          <p style={{ color: "#64748b", marginTop: "8px" }}>
            Every contribution helps move a meaningful cause forward.
          </p>
        </div>

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#64748b",
            }}
          >
            Loading campaigns...
          </div>
        )}

        {!loading && error && (
          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
              color: "#dc2626",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && campaigns.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "#fff",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: "800" }}>
              No campaigns available yet
            </h3>

            <p style={{ color: "#64748b", marginTop: "8px" }}>
              New impact campaigns will appear here soon.
            </p>
          </div>
        )}

        {!loading && campaigns.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {campaigns.map((campaign) => {
              const progress = getProgress(campaign);

              return (
                <article
                  key={campaign._id}
                  onClick={() =>
                    navigate(`/campaign/${campaign._id}`)
                  }
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 8px 25px rgba(15, 23, 42, 0.08)",
                    cursor: "pointer",
                    transition: "transform .2s ease, box-shadow .2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 35px rgba(15, 23, 42, 0.14)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(15, 23, 42, 0.08)";
                  }}
                >
                  {campaign.image ? (
                    <img
                      src={`${API_BASE}${campaign.image}`}
                      alt={campaign.title}
                      style={{
                        width: "100%",
                        height: "210px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "210px",
                        background:
                          "linear-gradient(135deg, #312e81, #0891b2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: "3rem",
                      }}
                    >
                      ❤️
                    </div>
                  )}

                  <div style={{ padding: "20px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#eef2ff",
                        color: "#4338ca",
                        padding: "5px 9px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: "800",
                        marginBottom: "10px",
                      }}
                    >
                      {campaign.category || "General"}
                    </span>

                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "900",
                        marginBottom: "9px",
                      }}
                    >
                      {campaign.title}
                    </h3>

                    <p
                      style={{
                        color: "#64748b",
                        fontSize: "14px",
                        lineHeight: "1.6",
                        minHeight: "68px",
                      }}
                    >
                      {campaign.description}
                    </p>

                    <div
                      style={{
                        marginTop: "18px",
                        height: "9px",
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
                        marginTop: "9px",
                        fontSize: "13px",
                        fontWeight: "700",
                      }}
                    >
                      <span>
                        {formatCurrency(campaign.amountRaised, campaign.currency)} raised
                      </span>

                      <span style={{ color: "#64748b" }}>
                        {progress.toFixed(0)}%
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "6px",
                        fontSize: "12px",
                        color: "#64748b",
                      }}
                    >
                      <span>
                        Goal: {formatCurrency(campaign.goalAmount, campaign.currency)}
                      </span>

                      <span>
                        {campaign.donorCount || 0} donors
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/donate?campaign=${campaign._id}`);
                      }}
                      style={{
                        width: "100%",
                        marginTop: "18px",
                        padding: "12px",
                        border: "none",
                        borderRadius: "10px",
                        background: "#4f46e5",
                        color: "#fff",
                        fontWeight: "800",
                        cursor: "pointer",
                      }}
                    >
                      Support This Campaign ❤️
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
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
