// frontend/src/pages/Success.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    // Expect Stripe to redirect with session_id
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      fetch(`/api/donations/success?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => setDonation(data))
        .catch((err) => console.error("Error fetching donation details:", err));
    }
  }, [location.search]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Donation Successful!
        </h1>

        {donation ? (
          <div className="text-gray-700 mb-6">
            <p className="mb-2">Thank you for your generosity!</p>
            <p className="font-semibold">Amount: ${donation.amount}</p>
            <p className="text-sm text-gray-500">
              Transaction ID: {donation.transactionId}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 mb-6">
            Fetching donation details...
          </p>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Back to Home
          </button>

          <button
            onClick={() => navigate("/donate")}
            className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Make Another Donation
          </button>
        </div>
      </div>
    </div>
  );
}
