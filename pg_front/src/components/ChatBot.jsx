


// import React, { useState } from "react";
// import { MessageCircle, X } from "lucide-react";
// import axios from "axios";

// const BASE_URL = "http://localhost:8081/api/admin/users";

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [userId, setUserId] = useState("");
//   const [input, setInput] = useState("");
//   const [showOptions, setShowOptions] = useState(true);
//   const [showUserOptions, setShowUserOptions] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);

//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//     if (!isOpen) {
//       setMessages([{ sender: "bot", text: "Hi 👋 How can I help you?" }]);
//       setShowOptions(true);
//       setShowUserOptions(false);
//       setUserId("");
//       setInput("");
//     }
//   };

//   const addBotMessage = (text) => {
//     setIsTyping(true);
//     setTimeout(() => {
//       setMessages((prev) => [...prev, { sender: "bot", text }]);
//       setIsTyping(false);
//     }, 800);
//   };

//   const handleOption = (option) => {
//     if (option === "About PG") addBotMessage("This is PG Management System 🏠");
//     else if (option === "Enter User ID") {
//       addBotMessage("Please enter your User ID 🔑");
//       setShowOptions(false);
//     }
//   };

//   const handleUserInput = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     setMessages((prev) => [...prev, { sender: "user", text: input }]);

//     if (!userId) {
//       try {
//         const res = await axios.get(`${BASE_URL}/${input}`);
//         const data = res.data;
//         setUserId(input);

//         addBotMessage(`Welcome ${data.userName} 🎉`);
//         setTimeout(() => addBotMessage("Choose an option below:"), 900);
//         setShowUserOptions(true);
//       } catch (error) {
//         console.error(error);
//         addBotMessage(
//           error.response?.status === 404
//             ? "⚠️ User ID not found, please try again."
//             : "❌ Failed to fetch user. Try again later."
//         );
//       }
//     }

//     setInput("");
//   };

//   const handleUserOption = async (action) => {
//     if (!userId) return;

//     // show clicked button as user message
//     setMessages((prev) => [
//       ...prev,
//       { sender: "user", text: action.charAt(0).toUpperCase() + action.slice(1) },
//     ]);

//     try {
//       const res = await axios.get(`${BASE_URL}/${userId}`);
//       const data = res.data;

//       if (action === "rent") addBotMessage(`💰 Monthly Rent: ₹${data.userMonthlyRent}`);
//       else if (action === "ebill") addBotMessage(`⚡ Electricity Bill: ₹${data.userEbill}`);
//       else if (action === "total") {
//         const total = (data.userMonthlyRent || 0) + (data.userEbill || 0);
//         addBotMessage(`📊 Total Amount: ₹${total}`);
//       }
//     } catch (error) {
//       console.error(error);
//       addBotMessage(
//         error.response?.status === 404
//           ? "⚠️ User not found. Please re-enter User ID."
//           : "❌ Failed to fetch details. Try again later."
//       );
//       setUserId("");
//       setShowUserOptions(false);
//       setShowOptions(true);
//     }
//   };

//   return (
//     <div>
//       {/* Floating Chat Icon */}
//       <button
//         onClick={toggleChat}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           backgroundColor: "#2575fc",
//           color: "white",
//           border: "none",
//           borderRadius: "50%",
//           width: "60px",
//           height: "60px",
//           cursor: "pointer",
//           boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           transition: "transform 0.3s",
//           zIndex: 1000,
//         }}
//       >
//         {isOpen ? <X size={30} /> : <MessageCircle size={30} />}
//       </button>

//       {/* Chat Window */}
//       {isOpen && (
//         <div
//           style={{
//             position: "fixed",
//              bottom: "90px",
//             right: "20px",
//             width: "360px",
//             height: "500px",
//             backgroundColor: "white",
//             borderRadius: "20px",
//             boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//             animation: "slideUp 0.3s ease-out",
//             zIndex: 999,
//           }}
//         >
//           {/* Messages */}
//           <div
//             style={{
//               flex: 1,
//               padding: "12px",
//               overflowY: "auto",
//               display: "flex",
//               flexDirection: "column",
//               gap: "8px",
//             }}
//           >
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 style={{
//                   backgroundColor: msg.sender === "bot" ? "#f1f1f1" : "#2575fc",
//                   color: msg.sender === "bot" ? "#000" : "#fff",
//                   alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
//                   padding: "10px 14px",
//                   borderRadius: "20px",
//                   maxWidth: "75%",
//                   wordWrap: "break-word",
//                   whiteSpace: "pre-wrap",
//                   transition: "all 0.3s",
//                   fontSize: "14px",
//                 }}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             {isTyping && (
//               <div
//                 style={{
//                   backgroundColor: "#f1f1f1",
//                   color: "#000",
//                   alignSelf: "flex-start",
//                   padding: "8px 12px",
//                   borderRadius: "15px",
//                   maxWidth: "50%",
//                   fontStyle: "italic",
//                   opacity: 0.7,
//                 }}
//               >
//                 typing...
//               </div>
//             )}
//           </div>

//           {/* Main Options */}
//           {showOptions && (
//             <div style={{ display: "flex", gap: "6px", padding: "8px" }}>
//               <button
//                 onClick={() => handleOption("About PG")}
//                 style={{
//                   flex: 1,
//                   backgroundColor: "#e0e0e0",
//                   border: "none",
//                   borderRadius: "12px",
//                   padding: "8px",
//                   cursor: "pointer",
//                 }}
//               >
//                 About PG
//               </button>
//               <button
//                 onClick={() => handleOption("Enter User ID")}
//                 style={{
//                   flex: 1,
//                   backgroundColor: "#e0e0e0",
//                   border: "none",
//                   borderRadius: "12px",
//                   padding: "8px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Enter User ID
//               </button>
//             </div>
//           )}

//           {/* User Options */}
//           {showUserOptions && (
//             <div style={{ display: "flex", gap: "6px", padding: "8px" }}>
//               <button
//                 onClick={() => handleUserOption("rent")}
//                 style={{
//                   flex: 1,
//                   backgroundColor: "#4ade80",
//                   border: "none",
//                   borderRadius: "12px",
//                   padding: "8px",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Rent
//               </button>
//               <button
//                 onClick={() => handleUserOption("ebill")}
//                 style={{
//                   flex: 1,
//                   backgroundColor: "#facc15",
//                   border: "none",
//                   borderRadius: "12px",
//                   padding: "8px",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                 }}
//               >
//                 E-Bill
//               </button>
//               <button
//                 onClick={() => handleUserOption("total")}
//                 style={{
//                   flex: 1,
//                   backgroundColor: "#f87171",
//                   border: "none",
//                   borderRadius: "12px",
//                   padding: "8px",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Total
//               </button>
//             </div>
//           )}

//           {/* Input */}
//           <form
//             onSubmit={handleUserInput}
//             style={{
//               display: "flex",
//               borderTop: "1px solid #ddd",
//               padding: "8px",
//             }}
//           >
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type a message..."
//               style={{
//                 flex: 1,
//                 border: "1px solid #ccc",
//                 borderRadius: "15px",
//                 padding: "10px",
//                 outline: "none",
//               }}
//             />
//             <button
//               type="submit"
//               style={{
//                 backgroundColor: "#2575fc",
//                 color: "#fff",
//                 border: "none",
//                 marginLeft: "6px",
//                 padding: "0 18px",
//                 borderRadius: "15px",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//               }}
//             >
//               Send
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBot;

import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import axios from "axios";

const BASE_URL = "http://localhost:8081/api/admin/users";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Fetch all users once on mount
  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => setAllUsers(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([{ sender: "bot", text: "Hi 👋 How can I help you?" }]);
      setInput("");
    }
  };

  // Add bot message with typing effect
  const addBotMessage = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text }]);
      setIsTyping(false);
    }, 600);
  };

  // Handle user input
  const handleUserInput = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);

    handleSearch(userMessage);

    setInput("");
  };

  // Handle search commands
  const handleSearch = (msg) => {
    const lowerMsg = msg.toLowerCase();

    // Name starts with
    if (lowerMsg.startsWith("name ")) {
      const prefix = msg.substring(5).trim();
      const filtered = allUsers.filter((u) =>
        u.userName.toLowerCase().startsWith(prefix.toLowerCase())
      );
      addBotMessage(formatTable(filtered, `Users starting with "${prefix}"`));
      return;
    }

    // Room number
    if (lowerMsg.startsWith("room ")) {
      const room = msg.substring(5).trim();
      const filtered = allUsers.filter(
        (u) => u.userRoom && u.userRoom.toLowerCase() === room.toLowerCase()
      );
      addBotMessage(formatTable(filtered, `Users in room "${room}"`));
      return;
    }

    // Mobile starts with
    if (lowerMsg.startsWith("mobile ")) {
      const prefix = msg.substring(7).trim();
      const filtered = allUsers.filter(
        (u) => u.userMobile && u.userMobile.startsWith(prefix)
      );
      addBotMessage(formatTable(filtered, `Users with mobile starting "${prefix}"`));
      return;
    }

    // Aadhaar contains
    if (lowerMsg.startsWith("aadhar ")) {
      const key = msg.substring(7).trim();
      const filtered = allUsers.filter(
        (u) => u.userAadhar && u.userAadhar.includes(key)
      );
      addBotMessage(formatTable(filtered, `Users with Aadhaar containing "${key}"`));
      return;
    }

    // Place contains
    if (lowerMsg.startsWith("place ")) {
      const place = msg.substring(6).trim();
      const filtered = allUsers.filter(
        (u) => u.userPlace && u.userPlace.toLowerCase().includes(place.toLowerCase())
      );
      addBotMessage(formatTable(filtered, `Users from "${place}"`));
      return;
    }

    // List all users
    if (lowerMsg === "list users") {
      addBotMessage(formatTable(allUsers, "All Users"));
      return;
    }

    // Default
    addBotMessage("🤔 I didn't understand that. Try again");
  };

  // Format users as a table
  const formatTable = (users, title) => {
    if (!users || users.length === 0) return `⚠️ No results for "${title}"`;

    let table = `📋 ${title}\n\n`;
    table += `ID | Name | Room | Mobile | Rent | E-Bill | Place\n`;
    table += "--------------------------------------------------------\n";
    users.forEach((u) => {
      table += `${u.userId || "-"} | ${u.userName || "-"} | ${u.userRoom || "-"} | ${u.userMobile || "-"} | ₹${u.userMonthlyRent || 0} | ₹${u.userEbill || 0} | ${u.userPlace || "-"}\n`;
    });
    return table;
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#2575fc",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        {isOpen ? <X size={30} /> : <MessageCircle size={30} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "400px",
            height: "500px",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 999,
          }}
        >
          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "12px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: msg.sender === "bot" ? "#f1f1f1" : "#2575fc",
                  color: msg.sender === "bot" ? "#000" : "#fff",
                  alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
                  padding: "10px 14px",
                  borderRadius: "20px",
                  maxWidth: "90%",
                  whiteSpace: "pre-wrap",
                  fontSize: "14px",
                }}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div
                style={{
                  backgroundColor: "#f1f1f1",
                  color: "#000",
                  alignSelf: "flex-start",
                  padding: "8px 12px",
                  borderRadius: "15px",
                  maxWidth: "50%",
                  fontStyle: "italic",
                  opacity: 0.7,
                }}
              >
                typing...
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleUserInput}
            style={{ display: "flex", borderTop: "1px solid #ddd", padding: "8px" }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                border: "1px solid #ccc",
                borderRadius: "15px",
                padding: "10px",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#2575fc",
                color: "#fff",
                border: "none",
                marginLeft: "6px",
                padding: "0 18px",
                borderRadius: "15px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
