


import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:8081/api/admin/users";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const location = useLocation();

  // Fetch users whenever the location changes
  useEffect(() => {
    fetchUsers();
  }, [location]);

  const fetchUsers = () => {
    axios
      .get(API_BASE)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  // Delete user
  const handleDelete = (userId) => {
    axios
      .delete(`${API_BASE}/${userId}`)
      .then(() => {
        setUsers(users.filter((u) => u.userId !== userId));
        setShowConfirm(false);
        setSelectedUser(null);
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "20px" }}>
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#2575fc", color: "white" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Room</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Electricity Bill</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.userRoom}</td>
                <td>{user.userMobile}</td>
                <td>₹{user.userEbill}</td>
                <td style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  <Link to={`/view-user/${user.userId}`} style={linkStyle("#4CAF50")}>
                    View
                  </Link>
                  <Link to={`/update-bill/${user.userId}`} style={linkStyle("#2575fc")}>
                    Update Bill
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowConfirm(true);
                    }}
                    style={btnDelete}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))} */}
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.userRoom}</td>
                <td>{user.userMobile}</td>
                <td>₹{user.userEbill}</td>
                <td style={{
                  color: user.paymentStatus === "PAID" ? "green" : "red",
                  fontWeight: "bold"
                }}>
                  {user.paymentStatus}
                </td>
                <td style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                  <Link to={`/view-user/${user.userId}`} style={linkStyle("#4CAF50")}>
                    View
                  </Link>
                  <Link to={`/update-bill/${user.userId}`} style={linkStyle("#2575fc")}>
                    Update Bill
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowConfirm(true);
                    }}
                    style={btnDelete}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Custom Confirm Popup */}
      {showConfirm && selectedUser && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete <strong>{selectedUser.userName}</strong>?</p>
            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() => handleDelete(selectedUser.userId)}
                style={btnDelete}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setSelectedUser(null);
                }}
                style={btnCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const btnStyle = {
  padding: "5px 10px",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const btnDelete = {
  ...btnStyle,
  backgroundColor: "#f44336",
};

const btnCancel = {
  ...btnStyle,
  backgroundColor: "gray",
  marginLeft: "10px",
};

const linkStyle = (bgColor) => ({
  padding: "5px 10px",
  background: bgColor,
  color: "white",
  textDecoration: "none",
  borderRadius: "4px",
});


const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  width: "300px",
};

export default UserList;


