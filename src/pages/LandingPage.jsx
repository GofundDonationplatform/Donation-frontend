// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Top nav (simple, matches your header style) */}
      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-3 py-1 rounded-md font-bold">GoFund</div>
          <span className="text-sm text-gray-200">Tech Crowdfunding</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm text-gray-300">
          <Link to="/home" className="hover:text-white">Campaigns</Link>
          <Link to="/terms" className="hover:text-white">Terms</Link>
          <Link to="/privacy" className="hover:text-white">Privacy</Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-8 pb-12 flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-3xl md:text-5xl font-extrabold leading-tight"
          >
            Build, Back & Launch — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">Global Projects</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-4 text-gray-300 max-w-xl"
          >
            GoFundSS is a tech crowdfunding platform for creators, builders, and changemakers. Support vetted projects or start your own — accept international contributions securely via multiple payment providers.
          </motion.p>

          <div className="mt-6 flex gap-3">
            <Link
              to="/home"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-400 text-black font-semibold shadow-lg hover:scale-[0.995] transition"
            >
              Enter Platform
            </Link>

            <a
              href="#how"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-slate-700 text-sm text-gray-300 hover:bg-slate-800"
            >
              How it works
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 max-w-sm">
            <div className="text-xs text-gray-400">Secure payments</div>
            <div className="text-xs text-gray-400">Multi-currency support</div>
            <div className="text-xs text-gray-400">Campaign analytics</div>
            <div className="text-xs text-gray-400">Quick setup for creators</div>
          </div>
        </div>

        {/* Visual / sample card column */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800/60 p-4 rounded-2xl backdrop-blur-sm shadow-xl border border-slate-700"
          >
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-400 flex items-center justify-center text-white font-bold">
                PR
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-300">Sample campaign</div>
                <div className="mt-2 font-semibold text-lg">Prototype: Solar IoT Hub</div>
                <p className="text-sm text-gray-300 mt-1">Funding to build 100 low-cost IoT solar stations for rural connectivity and micro-business power.</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-300">Raised: <span className="text-white font-semibold">$3,200</span></div>
                  <Link to="/donate" className="px-3 py-2 rounded-md bg-gradient-to-r from-purple-500 to-cyan-400 text-black text-sm font-semibold">Support</Link>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.45 }}
            className="bg-slate-800/60 p-4 rounded-2xl backdrop-blur-sm shadow-xl border border-slate-700"
          >
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-bold">
                ED
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-300">Popular</div>
                <div className="mt-2 font-semibold text-lg">Education Kits for Schools</div>
                <p className="text-sm text-gray-300 mt-1">Provide modular education kits and teacher training to 20 rural schools.</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-300">Goal: <span className="text-white font-semibold">$12,000</span></div>
                  <Link to="/donate" className="px-3 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-cyan-400 text-black text-sm font-semibold">Donate</Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-5xl mx-auto px-6 py-12">
        <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-semibold text-white/90 text-center">
          How GoFundSS works
        </motion.h3>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <div className="text-2xl font-bold">1</div>
            <h4 className="mt-3 font-semibold">Create a campaign</h4>
            <p className="mt-2 text-sm text-gray-300">Creators publish project descriptions, goals, and timelines.</p>
          </div>

          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <div className="text-2xl font-bold">2</div>
            <h4 className="mt-3 font-semibold">Get supporters</h4>
            <p className="mt-2 text-sm text-gray-300">Share your campaign and accept contributions in multiple currencies.</p>
          </div>

          <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700">
            <div className="text-2xl font-bold">3</div>
            <h4 className="mt-3 font-semibold">Deliver impact</h4>
            <p className="mt-2 text-sm text-gray-300">Withdraw funds (subject to verification) and report progress to backers.</p>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="mt-12 bg-gradient-to-r from-slate-800/60 to-slate-900/60 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-semibold">Ready to support a project?</h4>
            <p className="text-sm text-gray-300 mt-1">Browse campaigns and contribute with secure international payments.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/home" className="px-5 py-3 rounded-md bg-gradient-to-r from-purple-600 to-cyan-400 text-black font-semibold">Browse Campaigns</Link>
            <Link to="/donate" className="px-5 py-3 rounded-md border border-slate-700 text-gray-200">Start a campaign</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/60">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} GoFundSS • Tech Crowdfunding Platform
          </div>

          <div className="flex gap-4 text-sm">
            <Link to="/terms" className="text-gray-300 hover:text-white">Terms</Link>
            <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy</Link>
            <Link to="/refund" className="text-gray-300 hover:text-white">Refund</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
