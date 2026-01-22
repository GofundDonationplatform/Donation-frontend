import React from "react";
import "../assets/bg-pattern.svg";

export default function BackgroundWrapper({ children }) {
  return (
    <div
      style={{
        backgroundImage: "url('/assets/bg-pattern.svg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
