// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const RegisterAdmin = () => {
//   const [form, setForm] = useState({
//     adminName: "",
//     password: "",
//     role: "ADMIN", // default role
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:8081/api/admin/register",
//         form, // sends adminName, password, role
//         { headers: { "Content-Type": "application/json" } }
//       );

//       if (res.status === 200 && res.data?.adminName) {
//         setMessage(`Admin registered: ${res.data.adminName} (${res.data.role})`);
//         setForm({ adminName: "", password: "", role: "ADMIN" });
//         setTimeout(() => navigate("/login"), 2000); // redirect to login page
//       } else {
//         setMessage(res.data?.message || "Registration failed");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       setMessage("Registration failed. Check backend logs.");
//     }
//   };

//   return (
//     <div className="user-form-container">
//       <h2>Register Admin</h2>
//       {message && <p className="form-message">{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Name:</label>
//           <input
//             type="text"
//             name="adminName"
//             value={form.adminName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Role:</label>
//           <select name="role" value={form.role} onChange={handleChange} required>
//             <option value="ADMIN">ADMIN</option>
//             <option value="MANAGER">MANAGER</option>
//             {/* <option value="USER">USER</option> */}
//           </select>
//         </div>
//         <button type="submit" className="submit-btn">Register</button>
//       </form>
//     </div>
//   );
// };

// export default RegisterAdmin;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterAdmin = () => {
  const [form, setForm] = useState({
    adminName: "",
    password: "",
    role: "ADMIN", // default selection
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // send whatever role user selected, but backend should give same access
      const res = await axios.post(
        "http://localhost:8081/api/admin/register",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200 && res.data?.adminName) {
        setMessage(
          `Registered successfully: ${res.data.adminName} (Role: ${res.data.role})`
        );
        setForm({ adminName: "", password: "", role: "ADMIN" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(res.data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Registration failed. Check backend logs.");
    }
  };

  return (
    <div className="user-form-container">
      <h2>Register Admin / Manager</h2>
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
        <div className="form-group">
          <label>Role:</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER">MANAGER</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterAdmin;
