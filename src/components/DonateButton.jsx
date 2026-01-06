// src/components/SupportButton.jsx
import axios from "axios";

export default function SupportButton({ amount, label }) {
  const handleSupport = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payments/flutterwave/pay",
        {
          name: "Guest Donor",
          email: "guest@example.com",
          amount,
        }
      );

      if (response.data.link) {
        window.location.href = response.data.link;
      } else {
        alert("Payment failed to initialize. Please try again.");
        console.error("Invalid Flutterwave response:", response.data);
      }
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      alert("Digital Impact Support failed, try again (check console).");
    }
  };

  return (
    <button
      onClick={handleSupport}
      className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md"
    >
      {label || "Support"}
    </button>
  );
}
