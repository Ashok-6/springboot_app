import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/admin/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error("Error fetching user:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading user...</p>;
  if (!user) return <p style={{ textAlign: "center" }}>User not found.</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>User Details</h2>
      <p><strong>ID:</strong> {user.userId}</p>
      <p><strong>Name:</strong> {user.userName}</p>
      <p><strong>Room:</strong> {user.userRoom}</p>
      <p><strong>Mobile:</strong> {user.userMobile}</p>
      <p><strong>Electricity Bill:</strong> ₹{user.userEbill}</p>

      <button onClick={() => navigate("/users")} style={btnBack}>⬅ Back to Users</button>
    </div>
  );
};

const btnBack = {
  marginTop: "20px",
  padding: "8px 15px",
  backgroundColor: "#2575fc",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default UserDetail;
