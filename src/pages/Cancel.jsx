export default function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">⚠️ Payment Canceled</h1>
        <p className="text-gray-700 mb-6">
          Your donation was not completed. Don’t worry, you can try again anytime.
        </p>
        <a
          href="/"
          className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
