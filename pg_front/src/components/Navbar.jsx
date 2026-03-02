

// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import ChatBot from "./ChatBot";

// const Navbar = () => {
//   const adminToken = localStorage.getItem("token");

//   // SAFE parse for `user` in localStorage
//   const userStr = localStorage.getItem("user");
//   let parsedUser = null;
//   if (userStr) {
//     try {
//       parsedUser = JSON.parse(userStr);
//     } catch  {
//       console.warn("Invalid JSON in localStorage 'user':", userStr);
//       // Remove the invalid value (optional) so future loads don't throw
//       localStorage.removeItem("user");
//       parsedUser = null;
//     }
//   }

//   const [showDropdown, setShowDropdown] = useState(false);
//   const [paidThisMonth, setPaidThisMonth] = useState(false);
//   const dropdownRef = useRef(null);

//   // Fetch last payment for user (only if parsedUser and userId exist)
//   useEffect(() => {
//     if (parsedUser && parsedUser.userId) {
//       axios
//         .get(`http://localhost:8081/api/admin/users/${parsedUser.userId}`)
//         .then((res) => {
//           const lastPaymentDate = res.data.lastPaymentDate;
//           axios
//   .get(`http://localhost:8081/api/admin/bills/user/${parsedUser.userId}`)
//   .then((res) => {
//     setPaidThisMonth(res.data.status === "PAID");
//   });
//           if (lastPaymentDate) {
//             const paymentMonth = new Date(lastPaymentDate).getMonth();
//             const currentMonth = new Date().getMonth();
//             setPaidThisMonth(paymentMonth === currentMonth);
//           }
//         })
//         .catch((err) =>
//           console.error("Error fetching user payment info:", err)
//         );
//     }
//   }, [parsedUser]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/";
//   };

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const buttonStyle = {
//     background: "transparent",
//     color: "red",
//     border: "2px solid blue",
//     padding: "6px 14px",
//     cursor: "pointer",
//     borderRadius: "20px",
//     fontWeight: "bold",
//     marginLeft: "10px",
//     textDecoration: "none",
//     transition: "all 0.3s ease",
//   };

//   const buttonHover = {
//     background: "white",
//     color: "#2575fc",
//   };

//   return (
//     <>
//       <nav
//         style={{
//           padding: "15px 35px",
//           display: "flex",
//           alignItems: "center",
//           width: "100%",
//           position: "absolute",
//           top: 0,
//           left: 0,
//         }}
//       >
//         {/* Left Side - Home */}
//         <div>
//           <Link
//             to="/"
//             style={{ ...buttonStyle, marginLeft: "0" }}
//             onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
//             onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
//           >
//             🏠 Home
//           </Link>
//         </div>

//         {/* Right Side */}
//         <div style={{ display: "flex", alignItems: "center" }}>
//           {!adminToken && !parsedUser && (
//             <>
//               <Link
//                 to="/register"
//                 style={buttonStyle}
//                 onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
//                 onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
//               >
//                 📝 Register
//               </Link>

//               <div style={{ position: "relative" }} ref={dropdownRef}>
//                 <button
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   style={buttonStyle}
//                   onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
//                   onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
//                 >
//                   🔑 Login ▼
//                 </button>

//                 {showDropdown && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "45px",
//                       right: 0,
//                       background: "white",
//                       border: "1px solid #1846ecff",
//                       borderRadius: "10px",
//                       minWidth: "160px",
//                       boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
//                       zIndex: 10,
//                     }}
//                   >
//                     <Link
//                       to="/login"
//                       style={{
//                         display: "block",
//                         padding: "10px",
//                         textDecoration: "none",
//                         color: "#2575fc",
//                         borderBottom: "1px solid #eee",
//                       }}
//                       onClick={() => setShowDropdown(false)}
//                     >
//                       👨‍💼 Admin Login
//                     </Link>
//                     <Link
//                       to="/user-login"
//                       style={{
//                         display: "block",
//                         padding: "10px",
//                         textDecoration: "none",
//                         color: "#2575fc",
//                       }}
//                       onClick={() => setShowDropdown(false)}
//                     >
//                       🙍 User Login
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}

//           {adminToken && (
//             <>
//               <Link
//                 to="/user"
//                 style={buttonStyle}
//                 onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
//                 onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
//               >
//                 ➕ Create User
//               </Link>
//               <Link
//                 to="/users"
//                 style={buttonStyle}
//                 onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
//                 onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
//               >
//                 👥 Users
//               </Link>
//             </>
//           )}

//           {parsedUser && (
//             <>
//               <Link
//                 to={paidThisMonth ? "#" : "/payment"}
//                 style={{
//                   ...buttonStyle,
//                   backgroundColor: paidThisMonth ? "green" : "transparent",
//                   borderColor: paidThisMonth ? "green" : "white",
//                 }}
//                 onMouseOver={(e) =>
//                   Object.assign(
//                     e.target.style,
//                     paidThisMonth ? {} : buttonHover
//                   )
//                 }
//                 onMouseOut={(e) =>
//                   Object.assign(
//                     e.target.style,
//                     paidThisMonth ? {} : buttonStyle
//                   )
//                 }
//               >
//                 {paidThisMonth ? "Paid ✅" : "💳 Payment"}
//               </Link>
//             </>
//           )}

//           {(adminToken || parsedUser) && (
//             <button
//               onClick={handleLogout}
//               style={buttonStyle}
//               onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
//               onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
//             >
//               🚪 Logout
//             </button>
//           )}
//         </div>
//       </nav>

//       {/* Floating ChatBot */}
//       <div
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           zIndex: 9999,
//         }}
//       >
//         <ChatBot />
//       </div>
//     </>
//   );
// };

// export default Navbar;








import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ChatBot from "./ChatBot";

const Navbar = () => {
  const adminToken = localStorage.getItem("token");

  // Safe parse user
  const userStr = localStorage.getItem("user");
  let parsedUser = null;

  try {
    parsedUser = userStr ? JSON.parse(userStr) : null;
  } catch {
    localStorage.removeItem("user");
    parsedUser = null;
  }

  const [showDropdown, setShowDropdown] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const dropdownRef = useRef(null);

  // ✅ Fetch payment status from Admin Service
  useEffect(() => {
    if (parsedUser?.userId) {
      axios
        .get(`http://localhost:8081/api/admin/users/${parsedUser.userId}`)
        .then((res) => {
          setPaymentStatus(res.data.paymentStatus);
        })
        .catch((err) =>
          console.error("Error fetching payment status:", err)
        );
    }
  }, [parsedUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const buttonStyle = {
    background: "transparent",
    color: "red",
    border: "2px solid blue",
    padding: "6px 14px",
    cursor: "pointer",
    borderRadius: "20px",
    fontWeight: "bold",
    marginLeft: "10px",
    textDecoration: "none",
    transition: "all 0.3s ease",
  };

  const buttonHover = {
    background: "white",
    color: "#2575fc",
  };

  return (
    <>
      <nav
        style={{
          padding: "15px 35px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {/* Home */}
        <Link
          to="/"
          style={{ ...buttonStyle, marginLeft: "0" }}
          onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
          onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
        >
          🏠 Home
        </Link>

        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Public */}
          {!adminToken && !parsedUser && (
            <>
              <Link
                to="/register"
                style={buttonStyle}
                onMouseOver={(e) =>
                  Object.assign(e.target.style, buttonHover)
                }
                onMouseOut={(e) =>
                  Object.assign(e.target.style, buttonStyle)
                }
              >
                📝 Register
              </Link>

              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={buttonStyle}
                >
                  🔑 Login ▼
                </button>

                {showDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "45px",
                      right: 0,
                      background: "white",
                      border: "1px solid #2575fc",
                      borderRadius: "10px",
                      minWidth: "160px",
                      boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                      zIndex: 10,
                    }}
                  >
                    <Link
                      to="/login"
                      style={dropdownLink}
                      onClick={() => setShowDropdown(false)}
                    >
                      👨‍💼 Admin Login
                    </Link>
                    <Link
                      to="/user-login"
                      style={dropdownLink}
                      onClick={() => setShowDropdown(false)}
                    >
                      🙍 User Login
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Admin */}
          {adminToken && (
            <>
              <Link to="/user" style={buttonStyle}>
                ➕ Create User
              </Link>
              <Link to="/users" style={buttonStyle}>
                👥 Users
              </Link>
            </>
          )}

          {/* User */}
          {parsedUser && (
            <Link
              to={paymentStatus === "PAID" ? "#" : "/payment"}
              style={{
                ...buttonStyle,
                backgroundColor:
                  paymentStatus === "PAID" ? "green" : "transparent",
                borderColor:
                  paymentStatus === "PAID" ? "green" : "blue",
                color:
                  paymentStatus === "PAID" ? "white" : "red",
              }}
            >
              {paymentStatus === "PAID"
                ? "Paid ✅"
                : "💳 Payment"}
            </Link>
          )}

          {(adminToken || parsedUser) && (
            <button onClick={handleLogout} style={buttonStyle}>
              🚪 Logout
            </button>
          )}
        </div>
      </nav>

      {/* ChatBot */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <ChatBot />
      </div>
    </>
  );
};

const dropdownLink = {
  display: "block",
  padding: "10px",
  textDecoration: "none",
  color: "#2575fc",
};

export default Navbar;
