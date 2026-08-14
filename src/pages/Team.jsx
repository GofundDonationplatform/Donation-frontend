import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function Team() {
  return (
    <>
      <SEO
        title="Our Team | GFSSGA Impact Network"
        description="Meet the people and partners supporting GFSSGA Impact Network's technology, digital fundraising, campaign coordination, and community initiatives."
      />
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            Our Team
          </span>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            People behind the platform.
          </h1>

          <p className="mt-6 max-w-3xl leading-8 text-gray-600">
            GFSSGA Impact Network is supported by people working across
            technology, digital fundraising, campaign coordination and
            community-focused initiatives.
          </p>

          <p className="mt-4 max-w-3xl leading-8 text-gray-600">
            As the platform grows, our goal is to build a responsible team
            and partner network capable of supporting campaign organizers and
            protecting the interests of donors and communities.
          </p>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Our operating principles
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900">
                Responsible platform management
              </h3>
              <p className="mt-2 leading-7 text-gray-600">
                We aim to operate the platform with clear rules, appropriate
                review processes and responsible handling of user information.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900">
                Community focus
              </h3>
              <p className="mt-2 leading-7 text-gray-600">
                Our work is centered on connecting technology with campaigns
                and initiatives that seek positive community outcomes.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900">
                Security & trust
              </h3>
              <p className="mt-2 leading-7 text-gray-600">
                We seek to use appropriate authentication, payment and
                platform-security practices as the service develops.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900">
                Continuous improvement
              </h3>
              <p className="mt-2 leading-7 text-gray-600">
                We continuously improve the platform based on operational
                experience, user feedback and responsible technology practices.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/about"
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            About GFSSGA
          </Link>

          <Link
            to="/contact"
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Contact us
          </Link>
        </div>

      </div>
      </main>
    </>
  );
}
