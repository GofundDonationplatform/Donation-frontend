import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  
  const token = localStorage.getItem("token");

  const backendBase =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get(
       `${backendBase}/api/admin/users`,
     {
       headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
  if (!window.confirm("Delete this user?")) return;

  try {
    await axios.delete(
     `${backendBase}/api/admin/users/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
    loadUsers();
  } catch (err) {
    console.error(err);
    alert("Failed to delete user");
  }
};

  const toggleAdmin = async (id) => {
  try {
    await axios.put(
  `${backendBase}/api/admin/users/${id}/toggle-admin`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    loadUsers();
  } catch (err) {
    console.error(err);
    alert("Failed to update role");
  }
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
      <h1 style={{ color: "#22d3ee" }}>
        👥 User Management
      </h1>

      <p style={{ color: "#94a3b8" }}>
        Total Users: <strong>{users.length}</strong>
      </p>

      <div
        style={{
          marginTop: "25px",
          background: "#0f172a",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Email</th>
              <th style={{ textAlign: "left", padding: "10px" }}>Role</th>
              <th style={{ textAlign: "left", padding: "10px" }}>
              Actions
            </th> 
           </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                style={{
                  borderTop: "1px solid #1e293b",
                }}
              >
                <td style={{ padding: "10px" }}>
                  {user.name || user.username}
                </td>

                <td style={{ padding: "10px" }}>
                  {user.email}
                </td>

                <td style={{ padding: "10px" }}>
                  {user.isAdmin ? "Admin" : "User"}
                </td>
            
                <td style={{ padding: "10px" }}>
           <button
             onClick={() => toggleAdmin(user._id)}
               style={{
               marginRight: "10px",
               padding: "6px 10px",
               borderRadius: "6px",
               border: "none",
               cursor: "pointer",
               background: "#0ea5e9",
               color: "#fff",
           }}
          >
            {user.isAdmin ? "Remove Admin" : "Make Admin"}
             </button>

            <button
              onClick={() => deleteUser(user._id)}
              style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              background: "#dc2626",
              color: "#fff",
           }}
          >
               Delete
             </button>
             </td>
             </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
