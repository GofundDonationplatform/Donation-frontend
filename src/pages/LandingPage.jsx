import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509099836639-18ba1795216d')",
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-10 min-h-screen">

        {/* LOGO */}
        <img
          src="/images/gfssga-logo1.png"
          alt="GFSSGA Logo"
          className="w-28 md:w-40 mb-6 drop-shadow-lg"
        />

        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-3 drop-shadow-md">
          GFSSGA IMPACT NETWORK
        </h1>

        <h2 className="text-lg md:text-2xl font-medium text-indigo-300 mb-6 tracking-wide">
          GofundSS Donation Platform
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-200 max-w-lg text-sm md:text-base leading-relaxed mb-10">
          A modern crowdfunding platform focused on 
          <span className="font-semibold text-white"> education, women empowerment,</span> 
          and building brighter futures through transparent and impactful support.
        </p>

        {/* BUTTON */}
        <Link to="/home">
          <button className="px-8 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg hover:opacity-90 transition-all">
            Enter Platform
          </button>
        </Link>
      </div>
    </div>
  );
}
