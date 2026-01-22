import { Link } from "react-router-dom";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 text-center p-8">
      <h2 className="text-4xl font-bold text-green-700 mb-4">
        Thank You for Donating! 💚
      </h2>
      <p className="text-lg text-gray-700 mb-6 max-w-lg">
        Your generosity truly makes a difference.
      </p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-md transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
