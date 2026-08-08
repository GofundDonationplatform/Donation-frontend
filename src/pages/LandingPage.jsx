import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="public-landing">

      {/* ================= HEADER ================= */}
      <header className="landing-nav">
        <div className="landing-nav-inner">

          <Link to="/" className="landing-brand">
            <img src="/images/gfssga-logo1.png" alt="GFSSGA Impact Network" />
            <div>
              <strong>GFSSGA Impact Network</strong>
              <span>Digital Impact Platform</span>
            </div>
          </Link>

          <nav className="landing-nav-links">
            <Link to="/home">Explore causes</Link>
            <Link to="/donate">Support</Link>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="landing-nav-cta">
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
            <Link to="/home" className="landing-primary-btn">
              Explore causes
            </Link>

            <Link to="/register" className="landing-secondary-btn">
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

      {/* ================= INTRO ================= */}
      <section className="landing-intro">

        <div className="landing-section-heading">
          <span>WHY GFSSGA</span>
          <h2>A simpler way to make an impact</h2>
          <p>
            Our platform connects people, causes and communities
            through accessible digital fundraising and support tools.
          </p>
        </div>

        <div className="landing-feature-grid">

          <article className="landing-feature">
            <div className="feature-icon">❤️</div>
            <h3>Support meaningful causes</h3>
            <p>
              Find campaigns focused on education, community
              development, women empowerment and child welfare.
            </p>
          </article>

          <article className="landing-feature">
            <div className="feature-icon">📢</div>
            <h3>Start your campaign</h3>
            <p>
              Create a campaign and share your story with people
              who want to support positive change.
            </p>
          </article>

          <article className="landing-feature">
            <div className="feature-icon">🔐</div>
            <h3>Secure digital payments</h3>
            <p>
              Access integrated payment options designed to make
              supporting campaigns simple and convenient.
            </p>
          </article>

        </div>
      </section>

      {/* ================= CAUSE CATEGORIES ================= */}
      <section className="landing-causes">

        <div className="landing-section-heading">
          <span>EXPLORE</span>
          <h2>Causes worth supporting</h2>
          <p>
            Explore areas where your support can help create
            meaningful community impact.
          </p>
        </div>

        <div className="landing-cause-grid">

          <Link to="/home" className="landing-cause-card">
            <div>🎓</div>
            <h3>Education</h3>
            <p>Help expand access to learning and educational resources.</p>
            <span>Explore causes →</span>
          </Link>

          <Link to="/home" className="landing-cause-card">
            <div>👩🏽‍💼</div>
            <h3>Women Empowerment</h3>
            <p>Support opportunities that help women build sustainable futures.</p>
            <span>Explore causes →</span>
          </Link>

          <Link to="/home" className="landing-cause-card">
            <div>👨‍👩‍👧</div>
            <h3>Child Welfare</h3>
            <p>Support initiatives focused on children's wellbeing and opportunity.</p>
            <span>Explore causes →</span>
          </Link>

          <Link to="/home" className="landing-cause-card">
            <div>🏘️</div>
            <h3>Community Development</h3>
            <p>Help communities access resources and sustainable opportunities.</p>
            <span>Explore causes →</span>
          </Link>

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="landing-final-cta">

        <div>
          <span>READY TO MAKE A DIFFERENCE?</span>
          <h2>Your support can become someone's opportunity.</h2>
          <p>
            Explore campaigns or create your own and begin
            your digital impact journey today.
          </p>
        </div>

        <div className="landing-final-actions">
          <Link to="/home" className="landing-primary-btn">
            Explore campaigns
          </Link>

          <Link to="/register" className="landing-light-btn">
            Create account
          </Link>
        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="landing-footer">

        <div className="landing-footer-grid">

          <div className="landing-footer-brand">
            <Link to="/" className="landing-brand">
              <img src="/images/gfssga-logo1.png" alt="GFSSGA Impact Network" />
              <div>
                <strong>GFSSGA Impact Network</strong>
                <span>Digital Impact Platform</span>
              </div>
            </Link>

            <p>
              A digital platform connecting people with causes,
              fundraising opportunities and community impact.
            </p>
          </div>

          <div>
            <h4>Platform</h4>
            <Link to="/home">Explore causes</Link>
            <Link to="/donate">Support a cause</Link>
            <Link to="/register">Start a campaign</Link>
          </div>

          <div>
            <h4>Account</h4>
            <Link to="/login">User sign in</Link>
            <Link to="/register">Create account</Link>
            <Link to="/admin/login">Admin access</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/refund">Refund policy</Link>
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
  );
}
