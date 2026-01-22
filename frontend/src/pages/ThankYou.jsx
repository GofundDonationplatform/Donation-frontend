import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        Thank You for Donating! 💚
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Your generosity truly makes a difference. Together, we’re building a
        better world.
      </p>
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium"
      >
        Back to Home
      </Link>
    </div>
  );
}
