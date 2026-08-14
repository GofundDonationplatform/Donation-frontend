import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function About() {
  return (
    <>
      <SEO
        title="About GFSSGA Impact Network | Our Mission"
        description="Learn about GFSSGA Impact Network, our digital fundraising platform, mission, and commitment to community-focused impact."
      />
      <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            About GFSSGA
          </span>

          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            Technology connecting people with meaningful impact.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-gray-600">
            GFSSGA Impact Network is a digital impact platform designed to
            connect people, communities, campaign organizers and supporters
            through accessible digital fundraising and donation tools.
          </p>

          <p className="mt-4 max-w-3xl text-base leading-8 text-gray-600">
            Our goal is to make it easier for people to discover meaningful
            causes, understand fundraising goals, support campaigns and
            participate in community-focused initiatives.
          </p>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-3xl">🎓</div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Education
            </h2>
            <p className="mt-2 leading-7 text-gray-600">
              Supporting access to learning, educational resources and
              opportunities.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-3xl">👩🏽‍💼</div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Women Empowerment
            </h2>
            <p className="mt-2 leading-7 text-gray-600">
              Helping create opportunities for women and sustainable
              community development.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-3xl">👨‍👩‍👧</div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Child & Community Welfare
            </h2>
            <p className="mt-2 leading-7 text-gray-600">
              Supporting initiatives focused on wellbeing, opportunity and
              resilient communities.
            </p>
          </article>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Our approach
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-gray-900">
                Accessibility
              </h3>
              <p className="mt-2 leading-7 text-gray-600">
                We aim to make digital fundraising easier to understand and
                accessible to supporters and campaign organizers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Transparency
              </h3>
              <p className="mt-2 leading-7 text-gray-600">
                Campaign information, fundraising goals and platform policies
                are presented to help users make informed decisions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Responsible impact
              </h3>
              <p className="mt-2 leading-7 text-gray-600">
                We work to maintain platform rules and review processes that
                help protect users and discourage fraudulent fundraising.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/home"
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Explore campaigns
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
