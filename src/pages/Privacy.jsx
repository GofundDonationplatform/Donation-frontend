// src/pages/Privacy.jsx
import React from "react";

export default function Privacy() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">Privacy Policy</h1>

        <h2 className="font-semibold text-xl mt-4">Information We Collect</h2>
        <p>Name, email, phone number, campaign details, identification information for verification, digital impact support/payment information.</p>

        <h2 className="font-semibold text-xl mt-4">How We Use Your Information</h2>
        <p>We use your data to provide crowdfunding services, verify user identity and prevent fraud, process digital impact supports securely, improve platform functionality, comply with financial regulations.</p>

        <h2 className="font-semibold text-xl mt-4">Data Protection</h2>
        <p>We do not sell or share personal data with unauthorized parties. Payment information is handled only by secure third-party processors.</p>

        <h2 className="font-semibold text-xl mt-4">Cookies</h2>
        <p>Our platform uses cookies for performance, analytics, and security.</p>

        <h2 className="font-semibold text-xl mt-4">Data Retention</h2>
        <p>User information is stored only for regulatory compliance and platform performance needs.</p>
      </div>
    </div>
  );
}
