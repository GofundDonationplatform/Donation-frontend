import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Soft background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1600&q=80')",
        }}
      />

      {/* Logo top-left */}
      <div className="absolute top-6 left-8 flex items-center space-x-3 z-10">
        <img
          src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f0?auto=format&fit=crop&w=200&q=80"
          alt="Charity Logo"
          className="w-14 h-14 rounded-full border-2 border-cyan-400 shadow-md object-cover"
        />
        <span className="text-cyan-400 font-extrabold text-2xl tracking-wide">
          GoFundSS
        </span>
      </div>

      {/* Center text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
          Welcome to GoFundSS Donation Platform
        </h1>

        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-10 font-medium">
          Together we bring hope and impact to lives across the globe 🌎
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/home")}
          className="px-10 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xl font-semibold rounded-2xl shadow-lg hover:shadow-cyan-400/40 transition-all duration-300"
        >
          Enter Platform
        </motion.button>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-6 text-gray-500 text-sm z-10">
        © {new Date().getFullYear()} GoFundSS Donation Platform. All rights reserved.
      </div>
    </div>
  );
}
