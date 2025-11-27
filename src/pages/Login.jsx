// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const nav = useNavigate();
  const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${backend}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      nav("/home");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Login failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-12">
      <h2 className="text-2xl font-bold mb-4">Sign in</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full p-2 border rounded"/>
        <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded"/>
        <button disabled={loading} className="w-full bg-indigo-600 text-white p-2 rounded">{loading ? "Signing..." : "Sign in"}</button>
      </form>
    </div>
  );
}
