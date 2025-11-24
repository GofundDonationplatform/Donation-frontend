import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white overflow-hidden">

      {/* HERO SECTION */}
      <div
        className="relative w-full h-screen flex flex-col justify-center items-center text-center px-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl">
          {/* Logo */}
          <img
            src="/logo.png" // MAKE SURE your file is placed in public/logo.png
            alt="GFSSGA Impact Network Logo"
            className="w-40 mx-auto mb-6 drop-shadow-xl"
          />

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-yellow-400">
            GFSSGA IMPACT NETWORK
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-300">
            GOFUNDSS DONATION PLATFORM
          </h2>

          <p className="text-lg text-gray-200 mb-8">
            Empowering change through technology-driven crowdfunding.
            <br />
            Supporting education, women empowerment & community development.
          </p>

          <Link to="/home">
            <button className="px-8 py-4 rounded-xl text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-700 hover:opacity-90 transition">
              Enter Platform
            </button>
          </Link>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="bg-white text-gray-900 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-10">Why Choose Our Platform?</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 shadow-lg rounded-xl">
              <h4 className="text-xl font-semibold mb-2">Tech-Based Crowdfunding</h4>
              <p className="text-gray-600">
                Avoid NGO documentation — support causes using a modern, tech-driven approach.
              </p>
            </div>

            <div className="p-6 shadow-lg rounded-xl">
              <h4 className="text-xl font-semibold mb-2">Secure Payments</h4>
              <p className="text-gray-600">
                All donations are processed with secure gateways to ensure safe transactions.
              </p>
            </div>

            <div className="p-6 shadow-lg rounded-xl">
              <h4 className="text-xl font-semibold mb-2">Real Impact</h4>
              <p className="text-gray-600">
                Every contribution helps build opportunities for the less privileged.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
