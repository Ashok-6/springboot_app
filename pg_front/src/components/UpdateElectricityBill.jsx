import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateElectricityBill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [ebill, setEbill] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const API_BASE = "http://localhost:8081/api/admin/users";

  // Fetch user details once
  useEffect(() => {
    axios
      .get(`${API_BASE}/${id}`)
      .then((res) => {
        setUser(res.data);
        setEbill(res.data.userEbill || "");
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  // Update electricity bill
  const handleUpdate = () => {
    if (!ebill || isNaN(ebill)) {
      alert("Please enter a valid bill amount");
      return;
    }

    axios
      .patch(`${API_BASE}/${id}/ebill`, null, { params: { ebill } })
      .then((res) => {
        // Update local state: keep user details and reset paymentStatus to Due
        setUser((prev) => ({
          ...prev,
          userEbill: res.data.userEbill,
          paymentStatus: false, // reset to Due
        }));

        setMessage("✅ Bill updated successfully! Payment status reset to Due");
        setShowMessage(true);
      })
      .catch((err) => {
        console.error("Error updating bill:", err);
        setMessage("❌ Failed to update bill");
        setShowMessage(true);
      });
  };

  const handleOk = () => {
    setShowMessage(false);
    navigate("/users");
  };

  if (!user) return <p style={{ textAlign: "center" }}>Loading user...</p>;

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Update Electricity Bill</h2>

      {/* Display user details */}
      <div style={{ marginBottom: "10px" }}>
        <label>User ID: </label>
        <input value={user.userId} disabled />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Name: </label>
        <input value={user.userName} disabled />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Room: </label>
        <input value={user.userRoom} disabled />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Mobile: </label>
        <input value={user.userMobile} disabled />
      </div>

      {/* Editable bill */}
      <div style={{ marginBottom: "10px" }}>
        <label>Electricity Bill: </label>
        <input
          type="number"
          value={ebill}
          onChange={(e) => setEbill(e.target.value)}
        />
      </div>

      {/* Payment status
      <div style={{ marginBottom: "10px" }}>
        <label>Payment Status: </label>
        <input
          value={user.paymentStatus ? "Paid" : "Due"}
          disabled
          style={{
            color: user.paymentStatus ? "green" : "red",
            fontWeight: "bold",
          }}
        />
      </div> */}

      <button
        onClick={handleUpdate}
        style={{
          padding: "8px 12px",
          background: "#2575fc",
          color: "white",
          cursor: "pointer",
          borderRadius: "5px",
          border: "none",
        }}
      >
        Update Bill
      </button>

      {/* Success/Error message */}
      {showMessage && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <p>{message}</p>
          <button
            onClick={handleOk}
            style={{
              marginTop: "10px",
              padding: "5px 12px",
              background: "#26b246",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateElectricityBill;
