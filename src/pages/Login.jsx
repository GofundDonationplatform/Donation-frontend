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
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 lg:grid-cols-2">

          {/* BRAND PANEL */}
          <section className="relative hidden min-h-[650px] overflow-hidden bg-slate-950 lg:flex">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950" />

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex w-full flex-col justify-between p-12">
              <div>
                <Link
                  to="/"
                  className="inline-flex items-center gap-3 no-underline"
                >
                  <img
                    src="/images/gfssga-logo1.webp"
                    alt="GFSSGA Impact Network"
                    className="h-12 w-12 rounded-xl object-contain"
                  />

                  <div>
                    <strong className="block text-sm font-extrabold tracking-wide text-white">
                      GFSSGA Impact Network
                    </strong>
                    <span className="mt-1 block text-xs text-slate-400">
                      Digital Impact Platform
                    </span>
                  </div>
                </Link>
              </div>

              <div className="max-w-md">
                <span className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-200">
                  Welcome back
                </span>

                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white xl:text-5xl">
                  Continue making an impact.
                </h1>

                <p className="mt-5 text-base leading-7 text-slate-300">
                  Sign in to support meaningful causes, follow your
                  contributions, and manage your GoFundSS account.
                </p>

                <div className="mt-8 space-y-4 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300">
                      ✓
                    </span>
                    Support verified impact initiatives
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300">
                      ✓
                    </span>
                    Keep track of your giving activity
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300">
                      ✓
                    </span>
                    Stay connected with causes you care about
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Digital impact • Community • Opportunity
              </p>
            </div>
          </section>

          {/* LOGIN PANEL */}
          <section className="flex min-h-[650px] items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
            <div className="w-full max-w-md">

              {/* MOBILE BRANDING */}
              <div className="mb-8 text-center lg:hidden">
                <Link
                  to="/"
                  className="inline-flex items-center gap-3 no-underline"
                >
                  <img
                    src="/images/gfssga-logo1.webp"
                    alt="GFSSGA Impact Network"
                    className="h-12 w-12 rounded-xl object-contain"
                  />

                  <div className="text-left">
                    <strong className="block text-sm font-extrabold text-slate-900">
                      GFSSGA Impact Network
                    </strong>
                    <span className="mt-1 block text-xs text-slate-500">
                      Digital Impact Platform
                    </span>
                  </div>
                </Link>
              </div>

              <div className="mb-8">
                <p className="mb-2 text-sm font-bold uppercase tracking-wider text-indigo-600">
                  Account access
                </p>

                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                  Welcome back
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Sign in to continue supporting meaningful causes and
                  managing your account.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                >
                  {error}
                </div>
              )}

              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-2 block text-sm font-bold text-slate-700"
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="login-password"
                      className="block text-sm font-bold text-slate-700"
                    >
                      Password
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="login-password"
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-20 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1.5 text-xs font-bold text-indigo-600 transition hover:bg-indigo-50"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                <div className="pt-2 text-center">
                  <p className="text-sm text-slate-500">
                    Don't have an account?
                  </p>

                  <Link
                    to="/register"
                    className="mt-2 inline-flex font-extrabold text-indigo-600 no-underline transition hover:text-indigo-700"
                  >
                    Create account →
                  </Link>
                </div>
              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Secure access
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <Link
                to="/"
                className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 no-underline transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                ← Back to home
              </Link>

              <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                Your account helps you stay connected with the causes and
                campaigns that matter to you.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
