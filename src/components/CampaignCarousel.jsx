import React from "react";

const campaigns = [
  {
    title: "Help Build a School in Kenya",
    desc: "Education changes everything — help build classrooms.",
    raised: 7500,
    goal: 10000,
    img: "/src/assets/school.jpg",
  },
  {
    title: "Clean Water for All",
    desc: "Help provide sustainable water to rural communities.",
    raised: 2800,
    goal: 5000,
    img: "/src/assets/water.jpg",
  },
  {
    title: "Support Orphan Care",
    desc: "Provide shelter, food, and education for orphaned children.",
    raised: 6200,
    goal: 8000,
    img: "/src/assets/orphan.jpg",
  },
  {
    title: "Women Empowerment",
    desc: "Training and micro-loans for women.",
    raised: 2100,
    goal: 4500,
    img: "/src/assets/women.jpg",
  },
];

const CampaignCarousel = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((c, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
        >
          <img
            src={c.img}
            alt={c.title}
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-1">{c.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{c.desc}</p>
            <div className="text-sm text-gray-700 mb-2">
              Raised ${c.raised.toLocaleString()} of ${c.goal.toLocaleString()}
            </div>
            <a
              href="/donate"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Support
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignCarousel;
