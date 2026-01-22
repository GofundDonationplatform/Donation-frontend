import React from "react";

export default function Home() {
  const campaigns = [
    {
      id: 1,
      title: "support community services",
      description:
        "Help provide food, shelter, and education for children in underprivileged African communities.",
      image: "/images/african-children.jpg",
    },
    {
      id: 2,
      title: "Empower Women Entrepreneurs",
      description:
        "Support small business grants and training programs for women across developing nations.",
      image: "/images/women.jpg",
    },
    {
      id: 3,
      title: "build digital infrastructure for Every Child",
      description:
        "Contribute to building safe, accessible schools in rural regions where education is scarce.",
      image: "/images/school.jpg",
    },
    {
      id: 4,
      title: "digital access initiative",
      description:
        "Your digital impact support credits wells and water filtration systems in communities lacking clean water.",
      image: "/images/clean-water.jpg",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 16px",
      }}
    >
      {/* Hero Section */}
      <div style={{ textAlign: "center", maxWidth: 720 }}>
        <h1
          style={{
            fontSize: "2.4rem",
            fontWeight: "800",
            marginBottom: 12,
          }}
        >
          Welcome to Gocredit Digital Impact Support Platform
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#cbd5e1",
            marginBottom: 24,
          }}
        >
          Make a difference today — your contribution can change
          someone’s story. Together, we bring hope and opportunity.
        </p>
        <button
          onClick={() => (window.location.href = "/donate")}
          style={{
            background:
              "linear-gradient(90deg, #7c3aed, #06b6d4)",
            border: "none",
            borderRadius: "10px",
            padding: "12px 28px",
            fontWeight: "700",
            fontSize: "1rem",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
          }}
        >
          Support Now
        </button>
      </div>

      {/* Campaign List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "1100px",
          marginTop: "60px",
        }}
      >
        {campaigns.map((c) => (
          <div
            key={c.id}
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1.0)")
            }
          >
            <img
              src={c.image}
              alt={c.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "16px" }}>
              <h3 style={{ fontWeight: "700", marginBottom: "8px" }}>
                {c.title}
              </h3>
              <p
                style={{
                  color: "#cbd5e1",
                  fontSize: "0.95rem",
                  marginBottom: "16px",
                }}
              >
                {c.description}
              </p>
              <button
                onClick={() => (window.location.href = "/donate")}
                style={{
                  background:
                    "linear-gradient(90deg, #7c3aed, #06b6d4)",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  color: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Support
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ marginTop: 50, color: "#94a3b8" }}>
        © 2025 Gocredit Digital Impact Support Platform. All rights reserved.
      </footer>
    </div>
  );
}
