// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard(){
  const [me,setMe] = useState(null);
  const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (!token) return;
    axios.get(`${backend}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setMe(r.data.user))
      .catch(err => {
        console.error(err);
        alert("Not authorized or session expired");
      });
  },[]);

  if(!me) return <div className="p-6">Loading...</div>;

  if(me.role !== "admin") return <div className="p-6">You are not an admin</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-3">Welcome, {me.name} ({me.email})</p>
      {/* Add admin features here: campaigns list, verify donors, view donations, etc. */}
    </div>
  );
}
