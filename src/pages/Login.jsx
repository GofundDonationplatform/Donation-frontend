// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();
  const backend = API_BASE;

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${backend}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      nav("/home");
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Unable to sign in. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md">

        <div className="text-center mb-7">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30">
            <span className="text-2xl font-black text-white">G</span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            GoFundSS
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Digital Impact Support Platform
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.97] p-6 shadow-2xl shadow-black/30 sm:p-8">

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-900">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in to continue supporting meaningful causes and managing
              your account.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">

            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>

              <input
                id="login-email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                type="email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="login-password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-20 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="pt-1 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?
              </p>

              <Link
                to="/register"
                className="mt-2 inline-flex font-bold text-indigo-600 transition hover:text-cyan-600"
              >
                Create account →
              </Link>
            </div>

          </form>

          <div className="mt-7 border-t border-slate-100 pt-5 text-center">
            <Link
              to="/"
              className="text-sm font-medium text-slate-500 transition hover:text-indigo-600"
            >
              ← Back to home
            </Link>
          </div>

        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Secure account access • GoFundSS Digital Impact Platform
        </p>

      </div>
    </div>
  );
}
