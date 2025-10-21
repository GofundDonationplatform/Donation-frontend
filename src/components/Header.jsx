import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header container" role="banner">
      <div className="brand">
        <div className="logo">GF</div>
        <div>
          <div style={{ fontWeight: 800 }}>GoFund Donation Platform</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>Helping hands • Charity support</div>
        </div>
      </div>

      <nav className="navlinks" role="navigation" aria-label="Main">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/donate" className="nav-link">Donate</Link>
        <Link to="/campaigns" className="nav-link">Campaigns</Link>
      </nav>
    </header>
  );
}
