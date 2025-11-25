// src/pages/Terms.jsx
import React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">Terms & Conditions</h1>

        <p>GFSSGA Impact Network operates a tech-enabled crowdfunding platform that allows individuals to create, support, and manage fundraising campaigns for education, medical needs, community development, and social support initiatives. By using this website, you agree to these Terms & Conditions.</p>

        <h2 className="mt-4 font-semibold text-xl">Use of Platform</h2>
        <p>Users may create fundraising campaigns following our platform guidelines. Donations are voluntary and are not in exchange for goods or services. GFSSGA Impact Network reserves the right to decline or remove any campaign that violates ethical, legal, or compliance standards.</p>

        <h2 className="mt-4 font-semibold text-xl">Donations</h2>
        <p>Donations are processed through secure third-party payment providers. GFSSGA Impact Network does not guarantee the success of any campaign. All donations go directly to the beneficiary or campaign organizer after necessary verification.</p>

        <h2 className="mt-4 font-semibold text-xl">Verification</h2>
        <p>To protect donors and beneficiaries, GFSSGA may request additional documentation before disbursement.</p>

        <h2 className="mt-4 font-semibold text-xl">Compliance</h2>
        <p>Users agree not to engage in fundraising related to: money laundering, fraud, illegal activities, terror financing, hate speech, adult content, political violence.</p>

        <h2 className="mt-4 font-semibold text-xl">Limitation of Liability</h2>
        <p>GFSSGA Impact Network will not be responsible for: third-party payment issues, campaign organizer misrepresentation, donor errors.</p>

        <h2 className="mt-4 font-semibold text-xl">Amendment of Terms</h2>
        <p>We may update these terms at any time. Continued use of the platform indicates acceptance.</p>
      </div>
    </div>
  );
}
