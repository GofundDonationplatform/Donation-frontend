import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function CampaignDetails() {
  const { id } = useParams();

  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    loadCampaign();
  }, []);

  const loadCampaign = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/campaigns/${id}`
      );

      setCampaign(res.data.campaign);

    } catch (err) {
      console.error(err);
    }
  };

  if (!campaign) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#020617",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading Campaign...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#fff",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
        }}
      >
        <img
          src={`${API_BASE}${campaign.image}`}
          alt={campaign.title}
          style={{
            width: "100%",
            borderRadius: "18px",
            marginBottom: "25px",
          }}
        />

        <h1
          style={{
            color: "#22d3ee",
            marginBottom: "15px",
          }}
        >
          {campaign.title}
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "18px",
            lineHeight: "1.8",
          }}
        >
          {campaign.description}
        </p>

        <div
          style={{
            marginTop: "25px",
            fontSize: "18px",
          }}
        >
          <strong>Goal:</strong> ${campaign.goalAmount}
        </div>

        <div
          style={{
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          <strong>Raised:</strong> ${campaign.amountRaised}
        </div>

         <div
            style={{
             marginTop: "10px",
             fontSize: "18px",
          }}
        >
           <strong>Donors:</strong> {campaign.donorCount || 0}
        </div>

        <div
          style={{
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          <strong>Status:</strong> {campaign.status}
        </div>
        {/* Progress */}

        {(() => {
        const percent =
        campaign.goalAmount > 0
        ? Math.min(
          (campaign.amountRaised / campaign.goalAmount) * 100,
          100
        )
      : 0;

        return (
        <>
        <div
        style={{
          marginTop: "20px",
          background: "#1e293b",
          height: "14px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
       >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "#22d3ee",
            transition: "width .5s ease",
          }}
        />
      </div>

      <p
        style={{
          marginTop: "10px",
          color: "#cbd5e1",
          fontWeight: "700",
        }}
      >
        {percent.toFixed(1)}% Funded
      </p>
    </>
   );
 })()}

        <button
          onClick={() =>
            (window.location.href = `/donate?campaign=${id}`)
         }
          style={{
            marginTop: "30px",
            background: "#22d3ee",
            color: "#000",
            border: "none",
            padding: "14px 28px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "18px",
          }}
        >
          Donate Now ❤️
        </button>
      </div>
    </div>
  );
}
