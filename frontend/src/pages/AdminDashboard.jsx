import React from "react";

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="dashboard-container">
            <h1>Welcome Admin: {user?.name}</h1>

            <div className="admin-options">
                <button>View Digital Impact Supports</button>
                <button>Manage Users</button>
                <button>Update Campaigns</button>
                <button>Logout</button>
            </div>
        </div>
    );
};

export default AdminDashboard;
