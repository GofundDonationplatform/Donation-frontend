// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// MAIN PAGES
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import DonatePage from "./pages/DonatePage.jsx";               // ✅ Updated import
import DonateSuccess from "./pages/DonateSuccess";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";

// USER AUTH
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";

// ADMIN AUTH
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

// ==============================
// CHATBOT COMPONENT
// ==============================
function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I'm GoFund AI — how can I help you today?" },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = { from: "user", text: input };

    setMessages([...messages, newMsg]);
    setInput("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply || "Hmm... I couldn’t respond right now 🤔" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Oops! I can’t reach the server right now." },
      ]);
    }
  };

  return (
    <motion.div className="fixed bottom-6 right-6 z-50" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      {isOpen ? (
        <motion.div className="w-80 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-3 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-cyan-300 font-semibold">GoFund AI 💬</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-400">✖</button>
          </div>

          <div className="flex-1 overflow-y-auto max-h-64 mb-3 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  msg.from === "bot"
                    ? "bg-slate-800 text-gray-200"
                    : "bg-cyan-600 text-white self-end ml-auto"
                } max-w-[90%]`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 bg-slate-900/60 text-white px-2 py-1 rounded-lg border border-slate-700"
            />
            <button onClick={sendMessage} className="bg-gradient-to-r from-purple-600 to-cyan-500 px-3 rounded-lg">➤</button>
          </div>
        </motion.div>
      ) : (
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(true)} className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white p-4 rounded-full">
          💬
        </motion.button>
      )}
    </motion.div>
  );
}

// ==============================
// PAGE ANIMATIONS WRAPPER
// ==============================
function AnimatedRoutes() {
  const location = useLocation();

  const anim = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<motion.div variants={anim} initial="initial" animate="in" exit="out"><LandingPage /></motion.div>} />
        <Route path="/home" element={<motion.div variants={anim} initial="initial" animate="in" exit="out"><Home /></motion.div>} />
        <Route
         path="/donate"
        element={
          <motion.div variants={anim} initial="initial" animate="in" exit="out">
         <DonatePage />
       </motion.div>
       }
     />

       <Route
       path="/donate-success"
       element={
        <motion.div variants={anim} initial="initial" animate="in" exit="out">
          <DonateSuccess />
           </motion.div>
         }
        />

        {/* USER AUTH */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED USER DASHBOARD */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        } />

        {/* ADMIN AUTH */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* PROTECTED ADMIN DASHBOARD */}
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />

        {/* LEGAL PAGES */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />

        {/* 404 */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </AnimatePresence>
  );
}

// ==============================
// MAIN APP
// ==============================
export default function App() {
  return (
    <Router>
      <div className="app min-h-screen bg-slate-950 text-white flex flex-col">

        {/* HEADER */}
        <header className="flex justify-between items-center px-6 py-4 bg-slate-900/70 backdrop-blur-xl border-b border-white/10">
          <Link to="/" className="flex items-center gap-2 font-bold text-cyan-400 text-lg">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-3 py-1 rounded-lg">GoFund</span>
            Digital Impact Support
          </Link>

          <nav className="flex gap-4 text-sm">
            <Link to="/" className="hover:text-cyan-400">Home</Link>
            <Link to="/donate" className="hover:text-cyan-400">Support</Link>
            <Link to="/terms" className="hover:text-cyan-400">Terms</Link>
            <Link to="/privacy" className="hover:text-cyan-400">Privacy</Link>
            <Link to="/refund" className="hover:text-cyan-400">Refund</Link>
          </nav>
        </header>

        {/* ROUTES */}
        <main className="flex-1">
          <AnimatedRoutes />
        </main>

        {/* FOOTER */}
        <footer className="text-center text-gray-500 py-6 text-sm border-t border-white/10 space-y-2">
          <div>© {new Date().getFullYear()} GoFund Digital Impact Support Platform</div>
          <div className="flex justify-center gap-4">
            <Link to="/terms" className="hover:text-cyan-400">Terms</Link>
            <Link to="/privacy" className="hover:text-cyan-400">Privacy</Link>
            <Link to="/refund" className="hover:text-cyan-400">Refund</Link>
          </div>
        </footer>

        {/* CHAT AI */}
        <ChatBot />

      </div>
    </Router>
  );
}
