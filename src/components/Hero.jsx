import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Empower Change Through Your Donations
      </h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
        Every act of kindness matters. Join our community to make a measurable difference today.
      </p>
      <div className="space-x-4">
        <Link
          to="/donate"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Donate Now
        </Link>
        <Link
          to="/campaigns"
          className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
        >
          See Campaigns
        </Link>
      </div>
    </section>
  );
};

export default Hero;
