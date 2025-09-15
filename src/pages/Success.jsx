export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Thank You!</h1>
        <p className="text-gray-700 mb-6">
          Your donation was successful. We truly appreciate your support.
        </p>
        <a
          href="/"
          className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
