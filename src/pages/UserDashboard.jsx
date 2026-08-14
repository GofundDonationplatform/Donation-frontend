import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../config";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

const statusStyles = {
  Pending: "bg-amber-100 text-amber-800 border-amber-200",
  Approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Rejected: "bg-red-100 text-red-800 border-red-200",
  Paused: "bg-slate-100 text-slate-700 border-slate-200",
  Completed: "bg-blue-100 text-blue-800 border-blue-200",
};

const UserDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [campaignError, setCampaignError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("Invalid stored user:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchMyCampaigns = async () => {
      try {
        setLoading(true);
        setCampaignError("");

        const response = await axios.get(
          `${API_BASE}/api/campaigns/mine`,
          {
            headers: getAuthHeaders(),
          }
        );

        setCampaigns(response.data?.campaigns || []);
      } catch (error) {
        console.error("Failed to load my campaigns:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
          return;
        }

        setCampaignError(
          error.response?.data?.message ||
            "Unable to load your campaigns."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyCampaigns();
  }, [user, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <p className="text-slate-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              GFSSGA Impact Network
            </p>

            <h1 className="mt-1 text-2xl font-extrabold text-slate-900">
              My Dashboard
            </h1>
          </div>

          <button
            type="button"
            onClick={logout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="rounded-2xl bg-gradient-to-r from-indigo-700 to-cyan-600 p-7 text-white shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-100">
                Welcome back
              </p>

              <h2 className="mt-1 text-3xl font-extrabold">
                {user.name} 👋
              </h2>

              <p className="mt-2 text-sm text-indigo-100">
                {user.email}
              </p>
            </div>

            <Link
              to="/campaign-manager"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-extrabold text-indigo-700 shadow hover:bg-slate-100"
            >
              + Start a Campaign
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              My Campaigns
            </p>

            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {campaigns.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Approved
            </p>

            <p className="mt-2 text-3xl font-extrabold text-emerald-600">
              {
                campaigns.filter(
                  (campaign) => campaign.status === "Approved"
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Pending Review
            </p>

            <p className="mt-2 text-3xl font-extrabold text-amber-600">
              {
                campaigns.filter(
                  (campaign) => campaign.status === "Pending"
                ).length
              }
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                My Campaigns
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Campaigns you have created on the platform.
              </p>
            </div>

            <Link
              to="/campaign-manager"
              className="font-bold text-indigo-600 hover:text-indigo-800"
            >
              Manage campaigns →
            </Link>
          </div>

          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-slate-500">
                Loading your campaigns...
              </p>
            </div>
          )}

          {!loading && campaignError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <p className="font-semibold text-red-700">
                {campaignError}
              </p>
            </div>
          )}

          {!loading &&
            !campaignError &&
            campaigns.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <div className="mx-auto max-w-md">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    You haven't started a campaign yet.
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Start a fundraising campaign and share your cause
                    with supporters.
                  </p>

                  <Link
                    to="/campaign-manager"
                    className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700"
                  >
                    Start My First Campaign
                  </Link>
                </div>
              </div>
            )}

          {!loading &&
            !campaignError &&
            campaigns.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {campaigns.map((campaign) => {
                  const statusClass =
                    statusStyles[campaign.status] ||
                    "bg-slate-100 text-slate-700 border-slate-200";

                  const goal = Number(campaign.goalAmount || 0);
                  const raised = Number(campaign.amountRaised || 0);

                  const progress =
                    goal > 0
                      ? Math.min(
                          100,
                          Math.round((raised / goal) * 100)
                        )
                      : 0;

                  return (
                    <article
                      key={campaign._id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                      {campaign.image ? (
                        <img
                          src={campaign.image}
                          alt={campaign.title}
                          className="h-44 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-44 items-center justify-center bg-slate-100">
                          <span className="text-sm font-semibold text-slate-400">
                            No campaign image
                          </span>
                        </div>
                      )}

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-extrabold text-slate-900">
                            {campaign.title}
                          </h3>

                          <span
                            className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-bold ${statusClass}`}
                          >
                            {campaign.status}
                          </span>
                        </div>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                          {campaign.description}
                        </p>

                        <div className="mt-5">
                          <div className="mb-2 flex justify-between text-sm">
                            <span className="font-semibold text-slate-600">
                              Raised
                            </span>

                            <span className="font-extrabold text-slate-900">
                              {campaign.currency}{" "}
                              {raised.toLocaleString()}
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-indigo-600"
                              style={{
                                width: `${progress}%`,
                              }}
                            />
                          </div>

                          <div className="mt-2 flex justify-between text-xs text-slate-500">
                            <span>{progress}% funded</span>

                            <span>
                              Goal: {campaign.currency}{" "}
                              {goal.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <Link
                          to={`/campaign/${campaign._id}`}
                          className="mt-5 block rounded-xl border border-indigo-200 px-4 py-2.5 text-center text-sm font-bold text-indigo-700 hover:bg-indigo-50"
                        >
                          View Campaign
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
