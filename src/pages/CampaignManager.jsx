import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CampaignManager() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
  title: "",
  description: "",
  category: "General",
  goalAmount: "",
  image: "",
  featured: false,
  status: "Active",
 });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/campaigns");
      setCampaigns(res.data.campaigns);
    } catch (err) {
      console.error("Failed to load campaigns:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setForm({
    ...form,
    [name]: type === "checkbox" ? checked : value,
  });
 };

 const createCampaign = async (e) => {
  e.preventDefault();

  try {
    const payload = new FormData();

    payload.append("title", form.title);
    payload.append("description", form.description);
    payload.append("category", form.category);
    payload.append("goalAmount", Number(form.goalAmount));
    payload.append("featured", form.featured);
    payload.append("status", form.status);

    if (form.image) {
    payload.append("image", form.image);
  }

    if (editingId) {
      await axios.put(
        `http://localhost:5000/api/campaigns/${editingId}`,
        payload
      );

      alert("Campaign updated successfully!");
    } else {
      await axios.post(
       "http://localhost:5000/api/campaigns",
       payload,
     {
       headers: {
      "Content-Type": "multipart/form-data",
     },
   }
  );

      alert("Campaign created successfully!");
    }

    setForm({
      title: "",
      description: "",
      category: "General",
      goalAmount: "",
      image: "",
      featured: false,
      status: "Active",
    });

    setEditingId(null);
    setShowForm(false);

    fetchCampaigns();

  } catch (err) {
    console.error(err);
    alert(editingId ? "Failed to update campaign." : "Failed to create campaign.");
  }
};

const deleteCampaign = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this campaign?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/campaigns/${id}`);

    alert("Campaign deleted successfully!");

    fetchCampaigns();

  } catch (err) {
    console.error(err);
    alert("Failed to delete campaign.");
  }
};

const updateCampaignStatus = async (id, status) => {
  try {
    await axios.put(
      `http://localhost:5000/api/campaigns/${id}`,
      { status }
    );

    fetchCampaigns();

  } catch (err) {
    console.error(err);
    alert("Failed to update campaign status.");
  }
};

const updateStatus = async (id, status) => {
  try {
    await axios.put(
      `http://localhost:5000/api/campaigns/${id}`,
      {
        status,
      }
    );

    fetchCampaigns();

  } catch (err) {
    console.error(err);
    alert("Failed to update campaign status.");
  }
};

const editCampaign = (campaign) => {
  setEditingId(campaign._id);

  setForm({
    title: campaign.title,
    description: campaign.description,
    category: campaign.category,
    goalAmount: campaign.goalAmount,
    image: campaign.image,
    featured: campaign.featured,
    status: campaign.status || "Pending",
  });
  setShowForm(true);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
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
    <h1 style={{ color: "#22d3ee" }}>Campaign Management</h1>

    <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
      Create and manage fundraising campaigns.
    </p>

    <button
      onClick={() => setShowForm(!showForm)}
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
      {showForm ? "Close Form" : "+ Create New Campaign"}
    </button>

    {showForm && (
      <form
        onSubmit={createCampaign}
        style={{
          background: "#0f172a",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "25px",
          display: "grid",
          gap: "15px",
        }}
      >
        <input
          name="title"
          placeholder="Campaign Title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Campaign Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="goalAmount"
          placeholder="Goal Amount"
          value={form.goalAmount}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.files[0],
            })
          }
        />

        <label>
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured Campaign
        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Paused</option>
          <option>Completed</option>
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
          {editingId ? "Update Campaign" : "Save Campaign"}
        </button>
      </form>
    )}

    <div
  style={{
    marginTop: "30px",
    background: "#0f172a",
    borderRadius: "12px",
    padding: "20px",
  }}
>
  <h2
    style={{
      color: "#22d3ee",
      marginBottom: "20px",
    }}
  >
    Campaign List
  </h2>

  {loading ? (
    <p>Loading campaigns...</p>
  ) : campaigns.length === 0 ? (
    <p>No campaigns found.</p>
  ) : (
    <div
      style={{
        display: "grid",
        gap: "18px",
      }}
    >
      {campaigns.map((campaign) => (
        <div
          key={campaign._id}
          style={{
            background: "#1e293b",
            borderRadius: "10px",
            padding: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1 }}>
            <h3
              style={{
                color: "#fff",
                marginBottom: "8px",
              }}
            >
              {campaign.title}
            </h3>

            <p style={{ color: "#94a3b8" }}>
              {campaign.category}
            </p>

            <p
              style={{
                color: "#22d3ee",
                fontWeight: "bold",
              }}
            >
              Goal:
              ₦
              {Number(campaign.goalAmount).toLocaleString()}
            </p>

            <p>Status: {campaign.status}</p>

            {campaign.featured && (
              <span
                style={{
                  color: "#facc15",
                  fontWeight: "bold",
                }}
              >
                ⭐ Featured
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <button
              onClick={() => editCampaign(campaign)}
              style={{
                background: "#0284c7",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteCampaign(campaign._id)}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
 </div>
</div>
);
}
