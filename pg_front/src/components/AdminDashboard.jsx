import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState("");

  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8081/api/admin/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmin(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch admin details");
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <div className="user-form-container">
      <h2>Admin Dashboard</h2>
      {error && <p className="form-message">{error}</p>}
      {admin ? (
        <div>
          <p><b>ID:</b> {admin.adminId}</p>
          <p><b>Name:</b> {admin.adminName}</p>
          <p><b>Role:</b> {admin.role}</p>
        </div>
      ) : (
        <p>Loading admin details...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
