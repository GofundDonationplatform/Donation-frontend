// src/pages/Refund.jsx
import React from "react";

export default function Refund() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">Refund Policy</h1>

        <p>Digital Impact Supports are generally non-refundable because they are voluntary and often transferred immediately to beneficiaries.</p>

        <h2 className="font-semibold text-xl mt-4">Refund Eligibility</h2>
        <p>A refund may be considered only if a digital impact support was made in error, a duplicate digital impact support occurred, or there was a technical payment malfunction.</p>

        <h2 className="font-semibold text-xl mt-4">Refund Request Procedure</h2>
        <p>Send a request to: <a href="mailto:gofunddigital impact supportplatformhelpneed@gmail.com" className="text-blue-600 underline">gofunddigital impact supportplatformhelpneed@gmail.com</a> with subject: Refund Request – Digital Impact Support Error. Include your full name, digital impact support amount, campaign name, and proof of payment.</p>

        <p className="mt-4">Refunds may take 7–14 business days depending on the payment provider.</p>
      </div>
    </div>
  );
}
