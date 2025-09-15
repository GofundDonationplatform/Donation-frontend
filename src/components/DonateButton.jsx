import React from "react";
import API_BASE_URL from "../config";

export default function DonateButton({ amount }) {
  const handleCheckout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/donations/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Donate ${amount}
    </button>
  );
}
