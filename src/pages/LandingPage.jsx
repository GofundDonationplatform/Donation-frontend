import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config";
import { getImageUrl } from "../utils/imageUrl";
import SEO from "../components/SEO";

export default function LandingPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignLoading, setCampaignLoading] = useState(true);
  const [campaignError, setCampaignError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadFeaturedCampaigns();
  }, []);

  const loadFeaturedCampaigns = async () => {
    try {
      setCampaignLoading(true);
      setCampaignError("");

      const res = await axios.get(`${API_BASE}/api/campaigns`);

      const allCampaigns = res.data.campaigns || [];

      const approvedCampaigns = allCampaigns.filter(
        (campaign) =>
          campaign.status === "Approved" ||
          campaign.status === "Active" ||
          campaign.status === "Completed"
      );

      const featuredCampaigns = approvedCampaigns.filter(
        (campaign) => campaign.featured === true
      );

      const campaignsToShow =
        featuredCampaigns.length > 0
          ? featuredCampaigns
          : approvedCampaigns;

      setCampaigns(campaignsToShow);
    } catch (err) {
      console.error("Featured campaign loading failed:", err);
      setCampaignError(
        "Featured campaigns are temporarily unavailable."
      );
    } finally {
      setCampaignLoading(false);
    }
  };

  const getProgress = (campaign) => {
    if (!campaign.goalAmount || campaign.goalAmount <= 0) {
      return 0;
    }

    return Math.min(
      (Number(campaign.amountRaised || 0) /
        Number(campaign.goalAmount)) *
        100,
      100
    );
  };

  const formatCurrency = (amount, currency = "USD") => {
    return `${currency} ${Number(amount || 0).toLocaleString()}`;
  };

  const activeCampaignCount = campaigns.filter(
    (campaign) =>
      campaign.status === "Approved" ||
      campaign.status === "Active"
  ).length;

  const completedCampaignCount = campaigns.filter(
    (campaign) => campaign.status === "Completed"
  ).length;

  const totalDonorCount = campaigns.reduce(
    (total, campaign) =>
      total + Number(campaign.donorCount || 0),
    0
  );

  const campaignCurrencies = [
    ...new Set(
      campaigns
        .map((campaign) => campaign.currency)
        .filter(Boolean)
    ),
  ];

  const totalRaised =
    campaignCurrencies.length === 1
      ? campaigns.reduce(
          (total, campaign) =>
            total + Number(campaign.amountRaised || 0),
          0
        )
      : null;

  const totalRaisedCurrency =
    campaignCurrencies.length === 1
      ? campaignCurrencies[0]
      : null;

  return (
    <>
      <SEO
        title="GFSSGA Impact Network | Support Causes & Make an Impact"
        description="Discover meaningful fundraising campaigns, support communities, and help create positive change through GFSSGA Impact Network."
      />

      <div className="public-landing">

      {/* ================= HEADER ================= */}

      <header className="landing-nav">
        <div className="landing-nav-inner">

          <Link to="/" className="landing-brand">
            <img
              src="/images/gfssga-logo1.webp"
              alt="GFSSGA Impact Network"
            />

            <div>
              <strong>GFSSGA Impact Network</strong>
              <span>Digital Impact Platform</span>
            </div>
          </Link>

          <nav className="landing-nav-links">
            <Link to="/home">Explore causes</Link>
            <Link to="/donate">Support</Link>
            <Link to="/login">Sign in</Link>

            <Link
              to="/register"
              className="landing-nav-cta"
            >
              Create account
            </Link>
          </nav>

        </div>
      </header>

      {/* ================= HERO ================= */}

      <section className="landing-hero-new">

        <div className="landing-hero-overlay" />

        <div className="landing-hero-content">

          <div className="landing-eyebrow">
            💙 Making digital impact easier
          </div>

          <h1>
            Support causes that
            <span> matter.</span>
          </h1>

          <p>
            Discover meaningful campaigns, support communities,
            and help create positive change through the GFSSGA
            Impact Network.
          </p>

          <div className="landing-hero-actions">

            <Link
              to="/home"
              className="landing-primary-btn"
            >
              Explore causes
            </Link>

            <Link
              to="/register"
              className="landing-secondary-btn"
            >
              Start a campaign
            </Link>

          </div>

          <div className="landing-trust">
            <span>✓ Secure payments</span>
            <span>✓ Verified campaigns</span>
            <span>✓ Global access</span>
          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="landing-how-it-works">

        <div className="landing-section-heading">

          <span>HOW IT WORKS</span>

          <h2>Making digital impact simple</h2>

          <p>
            From discovering a cause to making a contribution,
            GFSSGA keeps the journey simple and transparent.
          </p>

        </div>

        <div className="landing-how-grid">

          <article className="landing-how-card">
            <div className="landing-how-number">01</div>
            <div className="landing-how-icon">🔎</div>

            <h3>Discover a cause</h3>

            <p>
              Explore campaigns and find a cause or community
              initiative that matters to you.
            </p>
          </article>

          <article className="landing-how-card">
            <div className="landing-how-number">02</div>
            <div className="landing-how-icon">📖</div>

            <h3>Learn about the campaign</h3>

            <p>
              Review the campaign story, goal, progress and
              the impact it is working to create.
            </p>
          </article>

          <article className="landing-how-card">
            <div className="landing-how-number">03</div>
            <div className="landing-how-icon">💳</div>

            <h3>Support securely</h3>

            <p>
              Choose how much you want to contribute and use
              an available digital payment option.
            </p>
          </article>

          <article className="landing-how-card">
            <div className="landing-how-number">04</div>
            <div className="landing-how-icon">💙</div>

            <h3>Create an impact</h3>

            <p>
              Your support contributes toward the campaign's
              stated goal and helps move the cause forward.
            </p>
          </article>

        </div>
      </section>

      {/* ================= WHY GFSSGA ================= */}

      <section className="landing-intro">

        <div className="landing-section-heading">

          <span>WHY GFSSGA</span>

          <h2>
            A simpler way to make an impact
          </h2>

          <p>
            Our platform connects people, causes and communities
            through accessible digital fundraising and support tools.
          </p>

        </div>

        <div className="landing-feature-grid">

          <article className="landing-feature">

            <div className="feature-icon">❤️</div>

            <h3>
              Support meaningful causes
            </h3>

            <p>
              Find campaigns focused on education, community
              development, women empowerment and child welfare.
            </p>

          </article>

          <article className="landing-feature">

            <div className="feature-icon">📢</div>

            <h3>
              Start your campaign
            </h3>

            <p>
              Create a campaign and share your story with people
              who want to support positive change.
            </p>

          </article>

          <article className="landing-feature">

            <div className="feature-icon">🔐</div>

            <h3>
              Secure digital payments
            </h3>

            <p>
              Access integrated payment options designed to make
              supporting campaigns simple and convenient.
            </p>

          </article>

        </div>

        {/* ================= WHAT IS GFSSGA ================= */}

        <div className="landing-mission">

          <div className="landing-mission-content">

            <span className="landing-mission-label">
              WHAT IS GFSSGA?
            </span>

            <h2>
              Technology that connects people with meaningful impact.
            </h2>

            <p>
              GFSSGA Impact Network is a digital platform designed to
              connect people, communities and fundraising campaigns through
              accessible digital tools. We make it easier for supporters to
              discover causes, understand campaign goals and contribute to
              initiatives that create positive change.
            </p>

            <p>
              Our mission is to make digital fundraising more accessible,
              transparent and community-focused while helping campaign
              organizers share their stories and reach people who care about
              their causes.
            </p>

            <div className="landing-mission-actions">
              <Link
                to="/about"
                className="landing-primary-btn"
              >
                Learn more about GFSSGA →
              </Link>

              <Link
                to="/team"
                className="landing-light-btn"
              >
                Meet the team
              </Link>
            </div>

          </div>

          <div className="landing-mission-pillars">

            <div className="landing-mission-pillar">
              <div className="landing-mission-pillar-icon">🎓</div>
              <div>
                <h3>Education</h3>
                <p>
                  Supporting access to learning, educational resources and
                  opportunities.
                </p>
              </div>
            </div>

            <div className="landing-mission-pillar">
              <div className="landing-mission-pillar-icon">👩🏽‍💼</div>
              <div>
                <h3>Women Empowerment</h3>
                <p>
                  Helping create opportunities for women and sustainable
                  community development.
                </p>
              </div>
            </div>

            <div className="landing-mission-pillar">
              <div className="landing-mission-pillar-icon">👨‍👩‍👧</div>
              <div>
                <h3>Child Welfare & Community</h3>
                <p>
                  Supporting initiatives that improve wellbeing, opportunity
                  and community resilience.
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ================= IMPACT STATS ================= */}

      <section className="landing-impact-stats">

        <div className="landing-impact-inner">

          <div className="landing-impact-heading">
            <span>OUR IMPACT</span>

            <h2>
              Real campaigns. Real community support.
            </h2>

            <p>
              These figures are calculated from campaigns currently
              available through the GFSSGA Impact Network.
            </p>
          </div>

          <div className="landing-impact-grid">

            <div className="landing-impact-stat">
              <strong>{campaigns.length}</strong>
              <span>Campaigns</span>
            </div>

            <div className="landing-impact-stat">
              <strong>{activeCampaignCount}</strong>
              <span>Active campaigns</span>
            </div>

            <div className="landing-impact-stat">
              <strong>{totalDonorCount.toLocaleString()}</strong>
              <span>Community donors</span>
            </div>

            <div className="landing-impact-stat">
              <strong>{completedCampaignCount}</strong>
              <span>Completed campaigns</span>
            </div>

          </div>

          <div className="landing-impact-raised">

            {totalRaised !== null ? (
              <>
                <strong>
                  {formatCurrency(totalRaised, totalRaisedCurrency)}
                </strong>

                <span>
                  total raised across available campaigns
                </span>
              </>
            ) : (
              <>
                <strong>
                  {campaignCurrencies.length || 0}
                </strong>

                <span>
                  campaign currency{campaignCurrencies.length === 1 ? "" : "ies"} represented
                </span>
              </>
            )}

          </div>

        </div>

      </section>

      {/* ================= FEATURED CAMPAIGNS ================= */}

      <section className="landing-featured-campaigns">

        <div className="landing-section-heading">

          <span>FEATURED CAMPAIGNS</span>

          <h2>
            Causes making an impact
          </h2>

          <p>
            Discover campaigns currently available for support
            through the GFSSGA Impact Network.
          </p>

        </div>

        {campaignLoading && (
          <div className="landing-campaign-state">
            <div className="landing-loading-spinner" />
            <p>Loading featured campaigns...</p>
          </div>
        )}

        {!campaignLoading && campaignError && (
          <div className="landing-campaign-state landing-campaign-error">
            <div className="landing-state-icon">⚠️</div>

            <h3>
              Campaigns temporarily unavailable
            </h3>

            <p>
              We're unable to load campaigns right now.
              Please try again shortly.
            </p>

            <button
              type="button"
              onClick={loadFeaturedCampaigns}
              className="landing-primary-btn landing-retry-btn"
            >
              Try again
            </button>
          </div>
        )}

        {!campaignLoading &&
          !campaignError &&
          campaigns.length === 0 && (
            <div className="landing-campaign-state">

              <div className="landing-state-icon">
                💙
              </div>

              <h3>
                New campaigns are coming soon
              </h3>

              <p>
                There are no approved campaigns available
                at the moment. Check back soon to discover
                new causes.
              </p>

            </div>
          )}

        {!campaignLoading &&
          !campaignError &&
          campaigns.length > 0 && (

            <div className="landing-featured-grid">

              {campaigns.slice(0, 3).map((campaign) => {

                const progress = getProgress(campaign);

                return (
                  <article
                    key={campaign._id}
                    className="landing-featured-card"
                    onClick={() =>
                      navigate(`/campaign/${campaign._id}`)
                    }
                  >

                    <div className="landing-featured-image-wrap">

                      {campaign.image ? (
                        <img
                          src={getImageUrl(campaign.image)}
                          alt={campaign.title}
                          className="landing-featured-image"
                        />
                      ) : (
                        <div className="landing-featured-placeholder">
                          ❤️
                        </div>
                      )}

                      {campaign.featured && (
                        <span className="landing-featured-badge">
                          ⭐ Featured
                        </span>
                      )}

                    </div>

                    <div className="landing-featured-content">

                      <span className="landing-category-badge">
                        {campaign.category || "General"}
                      </span>

                      <h3>
                        {campaign.title}
                      </h3>

                      <p>
                        {campaign.description}
                      </p>

                      <div className="landing-progress">

                        <div className="landing-progress-track">

                          <div
                            className="landing-progress-bar"
                            style={{
                              width: `${progress}%`,
                            }}
                          />

                        </div>

                        <div className="landing-progress-info">

                          <strong>
                            {progress.toFixed(0)}%
                          </strong>

                          <span>
                            {formatCurrency(
                              campaign.amountRaised,
                              campaign.currency
                            )}{" "}
                            raised
                          </span>

                        </div>

                      </div>

                      <div className="landing-campaign-meta">

                        <span>
                          Goal:{" "}
                          {formatCurrency(
                            campaign.goalAmount,
                            campaign.currency
                          )}
                        </span>

                        <span>
                          👥 {campaign.donorCount || 0} donors
                        </span>

                      </div>

                      <button
                        type="button"
                        className="landing-support-btn"
                        onClick={(event) => {
                          event.stopPropagation();

                          navigate(
                            `/donate?campaign=${campaign._id}`
                          );
                        }}
                      >
                        Support This Campaign ❤️
                      </button>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

        <div className="landing-featured-more">

          <Link
            to="/home"
            className="landing-secondary-btn"
          >
            View all campaigns →
          </Link>

        </div>

      </section>

      {/* ================= CAUSE CATEGORIES ================= */}

      <section className="landing-causes">

        <div className="landing-section-heading">

          <span>EXPLORE</span>

          <h2>
            Causes worth supporting
          </h2>

          <p>
            Explore areas where your support can help create
            meaningful community impact.
          </p>

        </div>

        <div className="landing-cause-grid">

          <Link
            to="/home"
            className="landing-cause-card"
          >
            <div>🎓</div>

            <h3>
              Education
            </h3>

            <p>
              Help expand access to learning and educational resources.
            </p>

            <span>
              Explore causes →
            </span>
          </Link>

          <Link
            to="/home"
            className="landing-cause-card"
          >
            <div>👩🏽‍💼</div>

            <h3>
              Women Empowerment
            </h3>

            <p>
              Support opportunities that help women build sustainable futures.
            </p>

            <span>
              Explore causes →
            </span>
          </Link>

          <Link
            to="/home"
            className="landing-cause-card"
          >
            <div>👨‍👩‍👧</div>

            <h3>
              Child Welfare
            </h3>

            <p>
              Support initiatives focused on children's wellbeing and opportunity.
            </p>

            <span>
              Explore causes →
            </span>
          </Link>

          <Link
            to="/home"
            className="landing-cause-card"
          >
            <div>🏘️</div>

            <h3>
              Community Development
            </h3>

            <p>
              Help communities access resources and sustainable opportunities.
            </p>

            <span>
              Explore causes →
            </span>
          </Link>

        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="landing-final-cta">

        <div>

          <span>
            READY TO MAKE A DIFFERENCE?
          </span>

          <h2>
            Your support can become someone's opportunity.
          </h2>

          <p>
            Explore campaigns or create your own and begin
            your digital impact journey today.
          </p>

        </div>

        <div className="landing-final-actions">

          <Link
            to="/home"
            className="landing-primary-btn"
          >
            Explore campaigns
          </Link>

          <Link
            to="/register"
            className="landing-light-btn"
          >
            Create account
          </Link>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="landing-footer">

        <div className="landing-footer-grid">

          <div className="landing-footer-brand">

            <Link
              to="/"
              className="landing-brand"
            >
              <img
                src="/images/gfssga-logo1.webp"
                alt="GFSSGA Impact Network"
              />

              <div>
                <strong>GFSSGA Impact Network</strong>
                <span>Digital Impact Platform</span>
              </div>
            </Link>

            <p>
              A digital platform connecting people with causes,
              fundraising opportunities and community impact.
            </p>

            <Link
              to="/about"
              className="landing-footer-about-link"
            >
              Learn more about GFSSGA →
            </Link>

          </div>

          <div>
            <h4>Platform</h4>

            <Link to="/about">
              About GFSSGA
            </Link>

            <Link to="/team">
              Our team
            </Link>

            <Link to="/home">
              Explore causes
            </Link>

            <Link to="/donate">
              Support a cause
            </Link>

            <Link to="/register">
              Start a campaign
            </Link>
          </div>

          <div>
            <h4>Support</h4>

            <Link to="/contact">
              Contact us
            </Link>

            <Link to="/contact">
              Campaign verification
            </Link>

            <Link to="/contact">
              Donation support
            </Link>

            <Link to="/refund">
              Refund requests
            </Link>
          </div>

          <div>
            <h4>Account</h4>

            <Link to="/login">
              User sign in
            </Link>

            <Link to="/register">
              Create account
            </Link>

            <Link to="/admin/login">
              Admin access
            </Link>
          </div>

          <div>
            <h4>Legal</h4>

            <Link to="/terms">
              Terms & Conditions
            </Link>

            <Link to="/privacy">
              Privacy Policy
            </Link>

            <Link to="/refund">
              Refund Policy
            </Link>
          </div>

        </div>

        <div className="landing-footer-bottom">

          <span>
            © {new Date().getFullYear()} GFSSGA Impact Network.
            All rights reserved.
          </span>

          <span>
            Digital impact • Community • Opportunity
          </span>

        </div>

      </footer>

    </div>
    </>
  );
}
