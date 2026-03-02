

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ADMIN_API, PAYMENT_API } from "../api/api";

// const PaymentInvoice = () => {
//   const [user, setUser] = useState(null);
//   const [paymentId, setPaymentId] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       fetchUser(storedUser.userId);
//     }
//   }, []);

//   const fetchUser = async (userId) => {
//     try {
//       const res = await axios.get(`${ADMIN_API}/users/${userId}`);
//       setUser(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handlePayment = async (method) => {
//     try {
//       // 1️⃣ Create payment
//       const res = await axios.post(
//         `${PAYMENT_API}/${user.userId}`,
//         null,
//         {
//           params: { paymentMethod: method },
//         }
//       );

//       setPaymentId(res.data.paymentId);

//       // 2️⃣ Update status in Admin MS
//       await axios.patch(
//         `${ADMIN_API}/users/${user.userId}/status`,
//         null,
//         { params: { status: "PAID" } }
//       );

//       setMessage("✅ Payment Successful");

//       // 3️⃣ Refresh user
//       fetchUser(user.userId);

//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Payment Failed");
//     }
//   };

//   const downloadInvoice = async () => {
//     try {
//       const res = await axios.get(
//         `${PAYMENT_API}/${paymentId}/invoice/download`,
//         { responseType: "blob" }
//       );

//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `invoice-${paymentId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   const totalAmount =
//     (user.userMonthlyRent || 0) + (user.userEbill || 0);

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Welcome {user.userName}</h2>

//       <h3>Monthly Rent: ₹{user.userMonthlyRent}</h3>
//       <h3>Electricity Bill: ₹{user.userEbill}</h3>
//       <h2>Total: ₹{totalAmount}</h2>

//       <h3>Status: {user.paymentStatus}</h3>

//       {user.paymentStatus === "DUE" ? (
//         <>
//           <button onClick={() => handlePayment("UPI")}>UPI</button>
//           <button onClick={() => handlePayment("CREDIT_CARD")}>
//             Credit Card
//           </button>
//           <button onClick={() => handlePayment("NET_BANKING")}>
//             Net Banking
//           </button>
//         </>
//       ) : (
//         <>
//           <h3 style={{ color: "green" }}>Bill Paid ✅</h3>
//           <button onClick={downloadInvoice}>
//             Download Invoice
//           </button>
//         </>
//       )}

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default PaymentInvoice;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ADMIN_API, PAYMENT_API } from "../api/api";

// const PaymentInvoice = () => {
//   const [user, setUser] = useState(null);
//   const [paymentId, setPaymentId] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     if (storedUser) {
//       const parsed = JSON.parse(storedUser);
//       fetchUser(parsed.userId);
//     }
//   }, []);

//   const fetchUser = async (userId) => {
//     try {
//       const res = await axios.get(`${ADMIN_API}/users/${userId}`);
//       setUser(res.data);
//     } catch (err) {
//       console.error("Error fetching user:", err);
//     }
//   };

//   const handlePayment = async (method) => {
//     try {
//       const res = await axios.post(
//         `${PAYMENT_API}/${user.userId}`,
//         null,
//         { params: { paymentMethod: method } }
//       );

//       setPaymentId(res.data.paymentId);
//       setMessage("✅ Payment Successful");

//       // Refresh user after payment
//       fetchUser(user.userId);

//     } catch (err) {
//       console.error("Payment error:", err);
//       setMessage("❌ Payment Failed");
//     }
//   };

//   const downloadInvoice = async () => {
//     try {
//       const res = await axios.get(
//         `${PAYMENT_API}/${paymentId}/invoice/download`,
//         { responseType: "blob" }
//       );

//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `invoice-${paymentId}.pdf`);
//       document.body.appendChild(link);
//       link.click();

//     } catch (err) {
//       console.error("Download error:", err);
//     }
//   };

//   if (!user) return <p style={{ marginTop: "100px" }}>Loading...</p>;

//   const totalAmount =
//     (user.userMonthlyRent || 0) + (user.userEbill || 0);

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Welcome {user.userName}</h2>

//       <h3>Monthly Rent: ₹{user.userMonthlyRent}</h3>
//       <h3>Electricity Bill: ₹{user.userEbill}</h3>
//       <h2>Total: ₹{totalAmount}</h2>

//       <h3>
//         Status:{" "}
//         <span
//           style={{
//             color: user.paymentStatus === "PAID" ? "green" : "red",
//             fontWeight: "bold",
//           }}
//         >
//           {user.paymentStatus}
//         </span>
//       </h3>

//       {user.paymentStatus === "DUE" ? (
//         <>
//           <button onClick={() => handlePayment("UPI")}>UPI</button>
//           <button onClick={() => handlePayment("CREDIT_CARD")}>
//             Credit Card
//           </button>
//           <button onClick={() => handlePayment("NET_BANKING")}>
//             Net Banking
//           </button>
//         </>
//       ) : (
//         <>
//           <h3 style={{ color: "green" }}>Bill Paid ✅</h3>
//           <button onClick={downloadInvoice}>
//             Download Invoice
//           </button>
//         </>
//       )}

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default PaymentInvoice;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_API, PAYMENT_API } from "../api/api";

const PaymentInvoice = () => {
  const [user, setUser] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      fetchUser(parsed.userId);
    }
  }, []);

  const fetchUser = async (userId) => {
    try {
      const res = await axios.get(`${ADMIN_API}/users/${userId}`);
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handlePayment = async (method) => {
    try {
      const res = await axios.post(
        `${PAYMENT_API}/${user.userId}`,
        null,
        { params: { paymentMethod: method } }
      );

      setPaymentId(res.data.paymentId);
      setMessage("✅ Payment Successful");
      fetchUser(user.userId);

    } catch (err) {
      console.error("Payment error:", err);
      setMessage("❌ Payment Failed");
    }
  };

  const downloadInvoice = async () => {
    try {
      const res = await axios.get(
        `${PAYMENT_API}/${paymentId}/invoice/download`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  if (!user) return <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>;

  const totalAmount =
    (user.userMonthlyRent || 0) + (user.userEbill || 0);

  // 🎨 Styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px"
  };

  const cardStyle = {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center"
  };

  const buttonStyle = {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    background: "#2575fc",
    color: "white",
    cursor: "pointer",
    margin: "5px",
    transition: "0.3s"
  };

  const downloadStyle = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    background: "green",
    color: "white",
    cursor: "pointer",
    marginTop: "15px"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Welcome {user.userName}</h2>

        <p><strong>Monthly Rent:</strong> ₹{user.userMonthlyRent}</p>
        <p><strong>Electricity Bill:</strong> ₹{user.userEbill}</p>
        <h3>Total: ₹{totalAmount}</h3>

        <h3>
          Status:{" "}
          <span
            style={{
              color: user.paymentStatus === "PAID" ? "green" : "red",
              fontWeight: "bold"
            }}
          >
            {user.paymentStatus}
          </span>
        </h3>

        {user.paymentStatus === "DUE" ? (
          <div>
            <button style={buttonStyle} onClick={() => handlePayment("UPI")}>
              UPI
            </button>
            <button style={buttonStyle} onClick={() => handlePayment("CREDIT_CARD")}>
              Credit Card
            </button>
            <button style={buttonStyle} onClick={() => handlePayment("NET_BANKING")}>
              Net Banking
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ color: "green" }}>Bill Paid ✅</h3>
            <button style={downloadStyle} onClick={downloadInvoice}>
              Download Invoice
            </button>
          </>
        )}

        {message && <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>}
      </div>
    </div>
  );
};

export default PaymentInvoice;