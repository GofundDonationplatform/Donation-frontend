// src/pages/Home.jsx
import React from "react";
import DonateButton from "../components/DonateButton";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Support Our Cause
        </h1>
        <p className="text-gray-600 mb-6">
          Your donation helps us continue making a positive impact.  
          Every contribution counts 💜
        </p>
        <DonateButton />
      </div>
    </div>
  );
}
