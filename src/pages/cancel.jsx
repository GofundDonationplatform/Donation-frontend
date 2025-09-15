// frontend/src/pages/Cancel.jsx
import { useNavigate } from "react-router-dom";

export default function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled ❌</h1>
        <p className="text-gray-700 mb-6">
          Your donation process was cancelled. Don’t worry — you can always try again!
        </p>

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
            Retry Donation
          </button>
        </div>
      </div>
    </div>
  );
}
