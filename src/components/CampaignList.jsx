// src/components/CampaignList.jsx
import React from "react";
import { Link } from "react-router-dom";

const sample = [
  { img: "/images/orphan-care.jpg", title: "Support Orphan Care", raised: 6200, goal: 8000 },
  { img: "/images/clean-water.jpg", title: "Clean Water for All", raised: 2800, goal: 5000 },
  { img: "/images/children-education.jpg", title: "Help Build a School in Kenya", raised: 7500, goal: 10000 },
];

export default function CampaignList() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-6">More Campaigns</h3>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sample.map((c, i) => (
          <div key={i} className="rounded-lg overflow-hidden shadow">
            <img src={c.img} alt={c.title} className="w-full h-48 object-cover" />
            <div className="p-4 bg-white">
              <h4 className="font-semibold">{c.title}</h4>
              <p className="text-sm text-gray-600 mt-1">Raised ${c.raised} of ${c.goal}</p>
              <div className="mt-3 flex justify-between items-center">
                <Link to="/donate" className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">
                  Donate
                </Link>
                <span className="text-xs text-gray-500">#{i + 1}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
