import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const [form, setForm] = useState({ adminName: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8081/api/admin/login",
        JSON.stringify(form),
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200 && res.data?.token) {
        // Save JWT token
        localStorage.setItem("token", res.data.token);
        setMessage("Login successful!");

        // Redirect to Create User page after 1 second
        setTimeout(() => navigate("/user"), 1000);
      } else {
        setMessage(res.data?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed. Check backend logs.");
    }
  };

  return (
    <div className="user-form-container">
      <h2>Login Admin</h2>
      {message && <p className="form-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="adminName"
            value={form.adminName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginAdmin;
