import React from "react";
import { Link } from "react-router-dom";

export default function CampaignCard({ campaign }) {
  return (
    <article className="campaign-card" role="article" aria-labelledby={`c-${campaign.id}`}>
      <img src={campaign.image} alt={campaign.title} />
      <div style={{ paddingTop: 8 }}>
        <h3 id={`c-${campaign.id}`} style={{ fontWeight: 700, color: "#0f172a" }}>{campaign.title}</h3>
        <p style={{ fontSize: 14, color: "#334155" }}>{campaign.description}</p>
        <p style={{ fontSize: 13, marginTop: 8 }}>
          Raised ${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()}
        </p>
        <div style={{ marginTop: 8 }}>
          <Link to="/donate" className="amount-btn" style={{ textDecoration: "none" }}>
            Support
          </Link>
        </div>
      </div>
    </article>
  );
}
