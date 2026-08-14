import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact GFSSGA Impact Network | Support"
        description="Contact GFSSGA Impact Network for campaign, donation, account, verification, and platform support."
      />
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            Contact
          </span>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            We're here to help.
          </h1>

          <p className="mt-6 max-w-3xl leading-8 text-gray-600">
            For questions about campaigns, donations, account access,
            verification or platform support, contact the GFSSGA Impact
            Network team.
          </p>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">

          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-3xl">📧</div>

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Email support
            </h2>

            <p className="mt-2 leading-7 text-gray-600">
              For general platform, donation and campaign enquiries.
            </p>

            <a
              href="mailto:gfssgaimpactnetwork@gmail.com"
              className="mt-4 inline-block font-semibold text-indigo-600 underline"
            >
              gfssgaimpactnetwork@gmail.com
            </a>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-3xl">🛡️</div>

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Campaign verification
            </h2>

            <p className="mt-2 leading-7 text-gray-600">
              If you need help with campaign verification or documentation,
              contact us with your campaign details and we will review the
              request.
            </p>
          </article>

        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Before contacting support
          </h2>

          <ul className="mt-5 space-y-3 text-gray-600">
            <li>• Include the email address associated with your account.</li>
            <li>• Include the campaign name when asking about a campaign.</li>
            <li>• Include a transaction reference for payment-related enquiries.</li>
            <li>• Never send us your full card number, PIN or password.</li>
          </ul>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/about"
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            About GFSSGA
          </Link>

          <Link
            to="/home"
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Explore campaigns
          </Link>

        </div>

      </div>
      </main>
    </>
  );
}
