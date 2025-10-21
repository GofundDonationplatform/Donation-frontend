import React from "react";
import Hero from "../components/Hero";
import CampaignCarousel from "../components/CampaignCarousel";

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Featured Campaigns
        </h2>
        <CampaignCarousel />
      </section>
    </div>
  );
};

export default HomePage;
