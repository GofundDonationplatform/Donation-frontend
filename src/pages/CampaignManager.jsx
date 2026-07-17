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
  <h1 style={{ color: "#22d3ee" }}>Campaign Manager</h1>

  <p>Campaign Manager is being restored.</p>
</div>
);
}
