import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const UserForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    userRoom: "",
    userAadhar: "",
    userPlace: "",
    userMonthlyRent: "",
    userEbill: "",
    userMobile: "",
    userPassword: "",
  });

  const [message, setMessage] = useState("");

  // Room list
  const [rooms, setRooms] = useState([
    { id: "R1B1", allocated: false },
    { id: "R1B2", allocated: false },
    { id: "R1B3", allocated: false },
    { id: "R1B4", allocated: false },
    { id: "R2B1", allocated: false },
    { id: "R2B2", allocated: false },
    { id: "R2B3", allocated: false },
    { id: "R2B4", allocated: false },
  ]);

  // Fetch allocated rooms from backend on mount
  useEffect(() => {
    const fetchAllocatedRooms = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/admin/users/rooms");
        const allocatedRooms = res.data;
        setRooms((prevRooms) =>
          prevRooms.map((room) => ({
            ...room,
            allocated: allocatedRooms.includes(room.id),
          }))
        );
      } catch (error) {
        console.error("Failed to fetch allocated rooms", error);
      }
    };
    fetchAllocatedRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleRoomSelect = (e) => {
    setUser((prevUser) => ({ ...prevUser, userRoom: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/admin/users", user);
      setMessage(`User created with ID: ${response.data.userId} at ${new Date().toLocaleTimeString()}`);
      setTimeout(() => setMessage(""), 3000);

      // Mark room allocated
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === user.userRoom ? { ...room, allocated: true } : room
        )
      );

      // Clear form
      setUser({
        userName: "",
        userRoom: "",
        userAadhar: "",
        userPlace: "",
        userMonthlyRent: "",
        userEbill: "",
        userMobile: "",
        userPassword: "",
      });
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to create user. Check backend logs.");
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT if stored
    navigate("/"); // redirect to home
  };

  return (
    <div className="user-form-container"
     style={{
    marginTop: "80px",   // pushes content down
    padding: "20px",     // adds spacing inside
    textAlign: "left",   // optional: align text
  }}
    
    
    >
      {/* Logout button at top-right */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <button onClick={handleLogout} style={{ padding: "5px 10px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <h2>Create User</h2>
      {message && <p className="form-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="userName" value={user.userName} onChange={handleChange} required />
        </div>

        {/* Room selection */}
        <div className="form-group">
          <label>Room:</label>
          <input type="text" name="userRoom" value={user.userRoom} readOnly style={{ marginRight: "10px" }} />
          <select onChange={handleRoomSelect} value="">
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id} disabled={room.allocated}>
                {room.id} {room.allocated ? "(Allocated)" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Aadhar */}
        <div className="form-group">
          <label>Aadhar:</label>
          <input type="text" name="userAadhar" value={user.userAadhar} onChange={handleChange} />
        </div>

        {/* Place */}
        <div className="form-group">
          <label>Place:</label>
          <input type="text" name="userPlace" value={user.userPlace} onChange={handleChange} required />
        </div>

        {/* Monthly Rent */}
        <div className="form-group">
          <label>Monthly Rent:</label>
          <input type="number" name="userMonthlyRent" value={user.userMonthlyRent} onChange={handleChange} required />
        </div>

        {/* Electricity Bill */}
        <div className="form-group">
          <label>Electricity Bill:</label>
          <input type="number" name="userEbill" value={user.userEbill} onChange={handleChange} required />
        </div>

        {/* Mobile */}
        <div className="form-group">
          <label>Mobile:</label>
          <input type="text" name="userMobile" value={user.userMobile} onChange={handleChange} required />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="userPassword" value={user.userPassword} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn">Create User</button>
      </form>
    </div>
  );
};

export default UserForm;

