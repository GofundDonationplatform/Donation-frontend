import React from "react";
import CampaignList from "../components/CampaignList.jsx";

export default function CampaignsPage() {
  return (
    <main style={{paddingBottom:40}}>
      <section className="container" style={{paddingTop:20}}>
        <h2 style={{color:"#fff", fontSize:22}}>All Campaigns</h2>
        <CampaignList />
      </section>
    </main>
  );
}
