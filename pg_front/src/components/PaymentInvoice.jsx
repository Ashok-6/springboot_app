

import React, { useState, useEffect } from "react";
import axios from "axios";
//import "./PaymentInvoice.css"; // CSS for tick animation

const PaymentInvoice = () => {
  const [user, setUser] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [showTick, setShowTick] = useState(false);
  const [isPaid, setIsPaid] = useState(false); // enables download
  const [processing, setProcessing] = useState(false); // disables buttons
  const [downloaded, setDownloaded] = useState(false); // disables invoice button

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      const rent = parseFloat(userData.userMonthlyRent || 0);
      const ebill = parseFloat(userData.userEbill || 0);
      setTotalAmount(rent + ebill);
    }
  }, []);

  const handlePayment = async (method) => {
    if (!user) return;

    setProcessing(true);
    setPaymentMessage("⏳ Processing payment...");
    setShowTick(false);
    setIsPaid(false);

    try {
      const response = await axios.post(
        `http://localhost:8082/api/payments/${user.userId}`,
        null,
        { params: { paymentMethod: method } }
      );

      if (response.status === 200 && response.data.paymentId) {
        setPaymentId(response.data.paymentId);

        // Show success after 5 seconds
        setTimeout(() => {
          setShowTick(true);
          setPaymentMessage(`Payment successful! Method: ${response.data.paymentMethod}`);
          setIsPaid(true);
          setProcessing(false);

          // Hide message & circle after 3 seconds
          setTimeout(() => {
            setShowTick(false);
            setPaymentMessage("");
          }, 3000);
        }, 5000);
      } else {
        setPaymentMessage("❌ Payment failed!");
        setProcessing(false);
      }
    } catch (error) {
      console.error("Payment error:", error.response || error);
      setPaymentMessage("❌ Payment failed!");
      setProcessing(false);
    }
  };

  const handleDownloadInvoice = async () => {
    if (!paymentId) {
      setPaymentMessage("❌ Make a payment first!");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8082/api/payments/${paymentId}/invoice/download`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Show download success message
      setPaymentMessage("✅ Invoice downloaded successfully!");
      setDownloaded(true); // disable invoice button

      // Hide message after 3 seconds
      setTimeout(() => setPaymentMessage(""), 3000);
    } catch (error) {
      console.error("Download error:", error.response || error);
      setPaymentMessage("❌ Failed to download invoice!");
    }
  };

  if (!user) {
    return <p style={{ textAlign: "center" }}>Please login to make a payment.</p>;
  }

  return (
    <div style={containerStyle}>
      <h2>Payment for {user.userName}</h2>
      <p><strong>Total Amount:</strong> ₹{totalAmount}</p>

      {/* Payment buttons */}
      <div style={{ margin: "20px 0" }}>
        {["CreditCard", "UPI", "NetBanking"].map((method) => (
          <button
            key={method}
            onClick={() => handlePayment(method)}
            style={{
              ...buttonStyle,
              opacity: processing || isPaid ? 0.6 : 1,
              cursor: processing || isPaid ? "not-allowed" : "pointer",
              boxShadow: processing || isPaid ? "0 0 10px #999 inset" : "0 4px 6px rgba(0,0,0,0.2)"
            }}
            disabled={processing || isPaid}
          >
            {method === "CreditCard" ? "💳 Credit/Debit Card" : method === "UPI" ? "📱 UPI" : "🏦 Net Banking"}
          </button>
        ))}
      </div>

      {/* Download invoice */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleDownloadInvoice}
          style={{
            ...downloadButtonStyle,
            opacity: isPaid && !downloaded ? 1 : 0.5,
            cursor: isPaid && !downloaded ? "pointer" : "not-allowed",
            boxShadow: isPaid && !downloaded ? "0 4px 6px rgba(0,0,0,0.2)" : "0 0 10px #999 inset"
          }}
          disabled={!isPaid || downloaded}
        >
          📄 Download Invoice
        </button>
      </div>

      {/* Payment message with tick */}
      {paymentMessage && (
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {showTick ? (
            <div className="success-tick-container">
              <div className="success-circle">
                <div className="tick"></div>
              </div>
              <p style={{ fontSize: "18px", fontWeight: "bold", color: "green", marginTop: "10px" }}>
                {paymentMessage}
              </p>
            </div>
          ) : (
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "orange" }}>
              {paymentMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentInvoice;

// Styles
const containerStyle = {
  maxWidth: "500px",
  margin: "40px auto",
  textAlign: "center",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

const buttonStyle = {
  margin: "5px",
  padding: "10px 15px",
  borderRadius: "25px",
  border: "none",
  backgroundColor: "#2575fc",
  color: "#fff",
  fontSize: "14px",
  transition: "all 0.3s",
};

const downloadButtonStyle = {
  padding: "10px 20px",
  borderRadius: "25px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "#fff",
  fontSize: "14px",
  transition: "all 0.3s",
};
