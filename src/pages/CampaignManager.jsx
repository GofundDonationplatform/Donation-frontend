import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const token = localStorage.getItem("token");

const AUTH_HEADERS = {
  Authorization: `Bearer ${token}`,
};

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "General",
  goalAmount: "",
  currency: "USD",
  image: null,
  featured: false,
  status: "Pending",
};

const EMPTY_UPDATE_FORM = {
  title: "",
  content: "",
  image: null,
};

export default function CampaignManager() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [featuredFilter, setFeaturedFilter] = useState("All");

  const [expandedCampaign, setExpandedCampaign] = useState(null);
  const [campaignUpdates, setCampaignUpdates] = useState({});
  const [updatesLoading, setUpdatesLoading] = useState({});
  const [showUpdateForm, setShowUpdateForm] = useState(null);
  const [updateForm, setUpdateForm] = useState(EMPTY_UPDATE_FORM);
  const [updateSubmitting, setUpdateSubmitting] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_BASE}/api/campaigns`
      );

      setCampaigns(res.data.campaigns || []);
    } catch (err) {
      console.error("Failed to load campaigns:", err);
      alert("Failed to load campaigns.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const resetCampaignForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const createCampaign = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Campaign title is required.");
      return;
    }

    if (!form.description.trim()) {
      alert("Campaign description is required.");
      return;
    }

    if (!form.goalAmount || Number(form.goalAmount) <= 0) {
      alert("Please enter a valid campaign goal.");
      return;
    }

    try {
      const payload = new FormData();

      payload.append(
        "title",
        form.title.trim()
      );

      payload.append(
        "description",
        form.description.trim()
      );

      payload.append(
        "category",
        form.category.trim() || "General"
      );

      payload.append(
        "goalAmount",
        Number(form.goalAmount)
      );

      payload.append(
        "currency",
        form.currency
      );

      payload.append(
        "featured",
        form.featured
      );

      payload.append(
        "status",
        form.status
      );

      if (form.image) {
        payload.append(
          "image",
          form.image
        );
      }

      if (editingId) {
        await axios.put(
          `${API_BASE}/api/campaigns/${editingId}`,
          payload,
          {
            headers: {
              ...AUTH_HEADERS,
            },
          }
        );

        alert(
          "Campaign updated successfully!"
        );
      } else {
        await axios.post(
          `${API_BASE}/api/campaigns`,
          payload,
          {
            headers: {
              ...AUTH_HEADERS,
            },
          }
        );

        alert(
          "Campaign created successfully!"
        );
      }

      resetCampaignForm();
      setShowForm(false);

      await fetchCampaigns();
    } catch (err) {
      console.error(
        "Campaign save error:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Failed to save campaign."
      );
    }
  };

  const deleteCampaign = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this campaign?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `${API_BASE}/api/campaigns/${id}`,
        {
          headers: AUTH_HEADERS,
        }
      );

      alert(
        "Campaign deleted successfully!"
      );

      await fetchCampaigns();
    } catch (err) {
      console.error(
        "Delete campaign error:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Failed to delete campaign."
      );
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await axios.put(
        `${API_BASE}/api/campaigns/${id}`,
        {
          status,
        },
        {
          headers: AUTH_HEADERS,
        }
      );

      await fetchCampaigns();
    } catch (err) {
      console.error(
        "Status update error:",
        err
      );

      alert(
        "Failed to update campaign status."
      );
    }
  };

  const editCampaign = (campaign) => {
    setEditingId(campaign._id);

    setForm({
      title: campaign.title || "",
      description:
        campaign.description || "",
      category:
        campaign.category || "General",
      goalAmount:
        campaign.goalAmount || "",
      currency:
        campaign.currency || "USD",
      image: null,
      featured:
        Boolean(campaign.featured),
      status:
        campaign.status || "Pending",
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const loadCampaignUpdates = async (
    campaignId
  ) => {
    try {
      setUpdatesLoading((prev) => ({
        ...prev,
        [campaignId]: true,
      }));

      const res = await axios.get(
        `${API_BASE}/api/campaign-updates/campaign/${campaignId}`
      );

      setCampaignUpdates((prev) => ({
        ...prev,
        [campaignId]:
          res.data.updates || [],
      }));
    } catch (err) {
      console.error(
        "Failed to load campaign updates:",
        err
      );

      alert(
        "Failed to load campaign updates."
      );
    } finally {
      setUpdatesLoading((prev) => ({
        ...prev,
        [campaignId]: false,
      }));
    }
  };

  const toggleUpdates = async (
    campaignId
  ) => {
    if (expandedCampaign === campaignId) {
      setExpandedCampaign(null);
      return;
    }

    setExpandedCampaign(campaignId);

    if (
      !campaignUpdates[campaignId]
    ) {
      await loadCampaignUpdates(
        campaignId
      );
    }
  };

  const handleUpdateChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitCampaignUpdate = async (
    e,
    campaignId
  ) => {
    e.preventDefault();

    if (!updateForm.title.trim()) {
      alert(
        "Update title is required."
      );
      return;
    }

    if (!updateForm.content.trim()) {
      alert(
        "Update content is required."
      );
      return;
    }

    try {
      setUpdateSubmitting(true);

      const payload =
        new FormData();

      payload.append(
        "campaignId",
        campaignId
      );

      payload.append(
        "title",
        updateForm.title.trim()
      );

      payload.append(
        "content",
        updateForm.content.trim()
      );

      if (updateForm.image) {
        payload.append(
          "image",
          updateForm.image
        );
      }

      await axios.post(
        `${API_BASE}/api/campaign-updates`,
        payload,
        {
          headers: {
            ...AUTH_HEADERS,
          },
        }
      );

      alert(
        "Campaign update published successfully!"
      );

      setUpdateForm(
        EMPTY_UPDATE_FORM
      );

      setShowUpdateForm(null);

      await loadCampaignUpdates(
        campaignId
      );
    } catch (err) {
      console.error(
        "Create campaign update error:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Failed to publish campaign update."
      );
    } finally {
      setUpdateSubmitting(false);
    }
  };

  const deleteCampaignUpdate = async (
    updateId,
    campaignId
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this campaign update?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `${API_BASE}/api/campaign-updates/${updateId}`,
        {
          headers: AUTH_HEADERS,
        }
      );

      alert(
        "Campaign update deleted."
      );

      await loadCampaignUpdates(
        campaignId
      );
    } catch (err) {
      console.error(
        "Delete campaign update error:",
        err
      );

      alert(
        "Failed to delete campaign update."
      );
    }
  };

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        campaigns
          .map(
            (campaign) =>
              campaign.category
          )
          .filter(Boolean)
      ),
    ];
  }, [campaigns]);

  const filteredCampaigns =
    campaigns.filter((campaign) => {
      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        campaign.title
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        campaign.status ===
          statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        campaign.category ===
          categoryFilter;

      const matchesFeatured =
        featuredFilter === "All"
          ? true
          : featuredFilter ===
            "Featured"
          ? campaign.featured
          : !campaign.featured;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesFeatured
      );
    });

  const formatCurrency = (
    amount,
    currency = "USD"
  ) => {
    return `${currency} ${Number(
      amount || 0
    ).toLocaleString()}`;
  };

  const getStatusColor = (
    status
  ) => {
    if (status === "Approved") {
      return "#16a34a";
    }

    if (status === "Pending") {
      return "#f59e0b";
    }

    if (status === "Paused") {
      return "#2563eb";
    }

    if (status === "Completed") {
      return "#9333ea";
    }

    if (status === "Rejected") {
      return "#dc2626";
    }

    return "#64748b";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#fff",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            color: "#22d3ee",
            marginBottom: "8px",
          }}
        >
          Campaign Management
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Create, manage, update, and monitor
          fundraising campaigns.
        </p>

        <button
          onClick={() => {
            if (showForm) {
              resetCampaignForm();
            }

            setShowForm(
              !showForm
            );
          }}
          style={{
            background: "#22d3ee",
            color: "#000",
            padding: "12px 18px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "700",
            cursor: "pointer",
            marginBottom: "25px",
          }}
        >
          {showForm
            ? "Close Form"
            : "+ Create New Campaign"}
        </button>

        {showForm && (
          <form
            onSubmit={
              createCampaign
            }
            style={{
              background: "#0f172a",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "25px",
              display: "grid",
              gap: "15px",
              border:
                "1px solid #1e293b",
            }}
          >
            <h2
              style={{
                color: "#22d3ee",
                margin: 0,
              }}
            >
              {editingId
                ? "Edit Campaign"
                : "Create Campaign"}
            </h2>

            <input
              name="title"
              placeholder="Campaign Title"
              value={form.title}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <textarea
              name="description"
              placeholder="Campaign Description"
              value={
                form.description
              }
              onChange={handleChange}
              rows="6"
              required
              style={inputStyle}
            />

            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="number"
              name="goalAmount"
              placeholder="Goal Amount"
              value={
                form.goalAmount
              }
              onChange={handleChange}
              min="1"
              required
              style={inputStyle}
            />

            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="USD">
                🇺🇸 USD — US Dollar
              </option>

              <option value="NGN">
                🇳🇬 NGN — Nigerian Naira
              </option>

              <option value="EUR">
                🇪🇺 EUR — Euro
              </option>

              <option value="GBP">
                🇬🇧 GBP — British Pound
              </option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  image:
                    e.target.files?.[0] ||
                    null,
                }))
              }
              style={{
                color: "#cbd5e1",
              }}
            />

            <label
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                color: "#cbd5e1",
              }}
            >
              <input
                type="checkbox"
                name="featured"
                checked={
                  form.featured
                }
                onChange={
                  handleChange
                }
              />

              Featured Campaign
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Rejected">
                Rejected
              </option>

              <option value="Paused">
                Paused
              </option>

              <option value="Completed">
                Completed
              </option>
            </select>

            <button
              type="submit"
              style={{
                background: "#22d3ee",
                color: "#000",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {editingId
                ? "Update Campaign"
                : "Save Campaign"}
            </button>
          </form>
        )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            margin: "25px 0",
            alignItems: "center",
          }}
        >
          <input
            placeholder="🔍 Search campaigns..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={filterInputStyle}
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            style={filterInputStyle}
          >
            <option value="All">
              All Statuses
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>

            <option value="Paused">
              Paused
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
            style={filterInputStyle}
          >
            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category ===
                  "All"
                    ? "All Categories"
                    : category}
                </option>
              )
            )}
          </select>

          <select
            value={featuredFilter}
            onChange={(e) =>
              setFeaturedFilter(
                e.target.value
              )
            }
            style={filterInputStyle}
          >
            <option value="All">
              All Campaigns
            </option>

            <option value="Featured">
              ⭐ Featured
            </option>

            <option value="Not Featured">
              Not Featured
            </option>
          </select>
        </div>

        {loading ? (
          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Loading campaigns...
          </p>
        ) : campaigns.length === 0 ? (
          <p
            style={{
              color: "#94a3b8",
            }}
          >
            No campaigns found.
          </p>
        ) : filteredCampaigns.length ===
          0 ? (
          <p
            style={{
              color: "#94a3b8",
            }}
          >
            No campaigns match your filters.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            {filteredCampaigns.map(
              (campaign) => (
                <div
                  key={campaign._id}
                  style={{
                    background:
                      "#1e293b",
                    borderRadius: "12px",
                    padding: "20px",
                    border:
                      "1px solid #334155",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      gap: "20px",
                      alignItems:
                        "flex-start",
                      flexWrap:
                        "wrap",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        minWidth:
                          "260px",
                      }}
                    >
                      <h3
                        style={{
                          color: "#fff",
                          marginBottom:
                            "8px",
                        }}
                      >
                        {
                          campaign.title
                        }
                      </h3>

                      <p
                        style={{
                          color:
                            "#94a3b8",
                          marginBottom:
                            "8px",
                        }}
                      >
                        {
                          campaign.category
                        }
                      </p>

                      <p
                        style={{
                          color:
                            "#22d3ee",
                          fontWeight:
                            "bold",
                        }}
                      >
                        Goal:{" "}
                        {formatCurrency(
                          campaign.goalAmount,
                          campaign.currency
                        )}
                      </p>

                      <p
                        style={{
                          color:
                            "#cbd5e1",
                          marginTop:
                            "5px",
                        }}
                      >
                        Raised:{" "}
                        {formatCurrency(
                          campaign.amountRaised,
                          campaign.currency
                        )}
                      </p>

                      <div
                        style={{
                          marginTop:
                            "12px",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: "10px",
                          flexWrap:
                            "wrap",
                        }}
                      >
                        <strong>
                          Status:
                        </strong>

                        <select
                          value={
                            campaign.status
                          }
                          onChange={(
                            e
                          ) =>
                            updateStatus(
                              campaign._id,
                              e.target
                                .value
                            )
                          }
                          style={{
                            padding:
                              "8px",
                            borderRadius:
                              "6px",
                            background:
                              "#0f172a",
                            color:
                              "#fff",
                            border:
                              "1px solid #334155",
                          }}
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Approved">
                            Approved
                          </option>

                          <option value="Rejected">
                            Rejected
                          </option>

                          <option value="Paused">
                            Paused
                          </option>

                          <option value="Completed">
                            Completed
                          </option>
                        </select>

                        <span
                          style={{
                            padding:
                              "5px 11px",
                            borderRadius:
                              "20px",
                            fontWeight:
                              "bold",
                            background:
                              getStatusColor(
                                campaign.status
                              ),
                            color:
                              "#fff",
                          }}
                        >
                          {
                            campaign.status
                          }
                        </span>
                      </div>

                      {campaign.featured && (
                        <span
                          style={{
                            display:
                              "inline-block",
                            marginTop:
                              "10px",
                            color:
                              "#facc15",
                            fontWeight:
                              "bold",
                          }}
                        >
                          ⭐ Featured
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display:
                          "flex",
                        gap: "10px",
                        flexWrap:
                          "wrap",
                      }}
                    >
                      <button
                        onClick={() =>
                          editCampaign(
                            campaign
                          )
                        }
                        style={{
                          background:
                            "#0284c7",
                          color:
                            "#fff",
                          border:
                            "none",
                          padding:
                            "10px 18px",
                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                          fontWeight:
                            "700",
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteCampaign(
                            campaign._id
                          )
                        }
                        style={{
                          background:
                            "#dc2626",
                          color:
                            "#fff",
                          border:
                            "none",
                          padding:
                            "10px 18px",
                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                          fontWeight:
                            "700",
                        }}
                      >
                        Delete
                      </button>

                      <button
                        onClick={() =>
                          toggleUpdates(
                            campaign._id
                          )
                        }
                        style={{
                          background:
                            "#7c3aed",
                          color:
                            "#fff",
                          border:
                            "none",
                          padding:
                            "10px 18px",
                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                          fontWeight:
                            "700",
                        }}
                      >
                        {expandedCampaign ===
                        campaign._id
                          ? "Hide Updates"
                          : "Progress Updates"}
                      </button>
                    </div>
                  </div>

                  {expandedCampaign ===
                    campaign._id && (
                    <div
                      style={{
                        marginTop:
                          "22px",
                        paddingTop:
                          "20px",
                        borderTop:
                          "1px solid #334155",
                      }}
                    >
                      <div
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "center",
                          gap: "15px",
                          flexWrap:
                            "wrap",
                        }}
                      >
                        <h3
                          style={{
                            color:
                              "#22d3ee",
                            margin: 0,
                          }}
                        >
                          Campaign Progress
                          Updates
                        </h3>

                        <button
                          onClick={() => {
                            setShowUpdateForm(
                              showUpdateForm ===
                                campaign._id
                                ? null
                                : campaign._id
                            );

                            setUpdateForm(
                              EMPTY_UPDATE_FORM
                            );
                          }}
                          style={{
                            background:
                              "#16a34a",
                            color:
                              "#fff",
                            border:
                              "none",
                            padding:
                              "10px 15px",
                            borderRadius:
                              "8px",
                            cursor:
                              "pointer",
                            fontWeight:
                              "700",
                          }}
                        >
                          {showUpdateForm ===
                          campaign._id
                            ? "Close Update Form"
                            : "+ Publish Update"}
                        </button>
                      </div>

                      {showUpdateForm ===
                        campaign._id && (
                        <form
                          onSubmit={(e) =>
                            submitCampaignUpdate(
                              e,
                              campaign._id
                            )
                          }
                          style={{
                            marginTop:
                              "18px",
                            padding:
                              "18px",
                            background:
                              "#0f172a",
                            borderRadius:
                              "10px",
                            display:
                              "grid",
                            gap:
                              "12px",
                          }}
                        >
                          <input
                            name="title"
                            placeholder="Update title"
                            value={
                              updateForm.title
                            }
                            onChange={
                              handleUpdateChange
                            }
                            required
                            style={
                              inputStyle
                            }
                          />

                          <textarea
                            name="content"
                            placeholder="What has happened since your last update?"
                            value={
                              updateForm.content
                            }
                            onChange={
                              handleUpdateChange
                            }
                            rows="5"
                            required
                            style={
                              inputStyle
                            }
                          />

                          <input
                            type="file"
                            accept="image/*"
                            onChange={(
                              e
                            ) =>
                              setUpdateForm(
                                (prev) => ({
                                  ...prev,
                                  image:
                                    e.target
                                      .files?.[0] ||
                                    null,
                                })
                              )
                            }
                            style={{
                              color:
                                "#cbd5e1",
                            }}
                          />

                          <button
                            type="submit"
                            disabled={
                              updateSubmitting
                            }
                            style={{
                              background:
                                updateSubmitting
                                  ? "#64748b"
                                  : "#16a34a",
                              color:
                                "#fff",
                              border:
                                "none",
                              padding:
                                "12px",
                              borderRadius:
                                "8px",
                              cursor:
                                updateSubmitting
                                  ? "not-allowed"
                                  : "pointer",
                              fontWeight:
                                "800",
                            }}
                          >
                            {updateSubmitting
                              ? "Publishing..."
                              : "Publish Campaign Update"}
                          </button>
                        </form>
                      )}

                      {updatesLoading[
                        campaign._id
                      ] ? (
                        <p
                          style={{
                            color:
                              "#94a3b8",
                            marginTop:
                              "18px",
                          }}
                        >
                          Loading updates...
                        </p>
                      ) : (
                        <div
                          style={{
                            marginTop:
                              "20px",
                            display:
                              "grid",
                            gap:
                              "14px",
                          }}
                        >
                          {(
                            campaignUpdates[
                              campaign._id
                            ] || []
                          ).length === 0 ? (
                            <p
                              style={{
                                color:
                                  "#94a3b8",
                              }}
                            >
                              No progress updates
                              yet.
                            </p>
                          ) : (
                            (
                              campaignUpdates[
                                campaign._id
                              ] || []
                            ).map(
                              (update) => (
                                <div
                                  key={
                                    update._id
                                  }
                                  style={{
                                    background:
                                      "#172033",
                                    border:
                                      "1px solid #334155",
                                    borderRadius:
                                      "10px",
                                    padding:
                                      "16px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display:
                                        "flex",
                                      justifyContent:
                                        "space-between",
                                      gap:
                                        "15px",
                                      alignItems:
                                        "flex-start",
                                    }}
                                  >
                                    <div>
                                      <h4
                                        style={{
                                          margin:
                                            0,
                                          color:
                                            "#fff",
                                        }}
                                      >
                                        {
                                          update.title
                                        }
                                      </h4>

                                      <p
                                        style={{
                                          marginTop:
                                            "6px",
                                          color:
                                            "#64748b",
                                          fontSize:
                                            "12px",
                                        }}
                                      >
                                        {new Date(
                                          update.createdAt
                                        ).toLocaleString()}
                                      </p>
                                    </div>

                                    <button
                                      onClick={() =>
                                        deleteCampaignUpdate(
                                          update._id,
                                          campaign._id
                                        )
                                      }
                                      style={{
                                        background:
                                          "transparent",
                                        color:
                                          "#f87171",
                                        border:
                                          "1px solid #7f1d1d",
                                        padding:
                                          "6px 10px",
                                        borderRadius:
                                          "6px",
                                        cursor:
                                          "pointer",
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>

                                  <p
                                    style={{
                                      marginTop:
                                        "14px",
                                      color:
                                        "#cbd5e1",
                                      lineHeight:
                                        "1.7",
                                      whiteSpace:
                                        "pre-line",
                                    }}
                                  >
                                    {
                                      update.content
                                    }
                                  </p>

                                  {update.image && (
                                    <img
                                      src={`${API_BASE}${update.image}`}
                                      alt={
                                        update.title
                                      }
                                      style={{
                                        width:
                                          "100%",
                                        maxHeight:
                                          "350px",
                                        objectFit:
                                          "cover",
                                        borderRadius:
                                          "8px",
                                        marginTop:
                                          "14px",
                                      }}
                                    />
                                  )}
                                </div>
                              )
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#020617",
  color: "#fff",
  fontSize: "15px",
};

const filterInputStyle = {
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "#fff",
  fontSize: "14px",
};
