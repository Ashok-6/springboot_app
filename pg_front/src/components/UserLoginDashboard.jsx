

import React, { useState, useEffect } from "react";
import axios from "axios";

const UserLoginDashboard = () => {
  const [loginData, setLoginData] = useState({
    userName: "",
    userPassword: "",
  });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load logged-in user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8082/api/users/login",
        loginData
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setMessage("✅ Login successful!");
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message ||
          "❌ Login failed. Check username/password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setLoginData({ userName: "", userPassword: "" });
    setMessage("");
  };

  if (user) {
    return (
      <div className="user-dashboard"  

       style={{
    marginTop: "80px",   // pushes content down
    padding: "20px",     // adds spacing inside
    textAlign: "left",   // optional: align text
  }}
      
      >
        <h2>Welcome, {user.userName}</h2>
        <p><strong>Room:</strong> {user.userRoom}</p>
        <p><strong>Aadhar:</strong> {user.userAadhar}</p>
        <p><strong>Place:</strong> {user.userPlace}</p>
        <p><strong>Monthly Rent:</strong> {user.userMonthlyRent}</p>
        <p><strong>Electricity Bill:</strong> {user.userEbill}</p>
        <p><strong>Mobile:</strong> {user.userMobile}</p>


        <button onClick={handleLogout} className="submit-btn" style={{ marginTop: "20px" }}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h2>User Login</h2>
      {message && <p className="form-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={loginData.userName}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="userPassword"
            value={loginData.userPassword}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? <div className="spinner"></div> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default UserLoginDashboard;
