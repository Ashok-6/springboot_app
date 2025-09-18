// // // // import React, { useState } from "react";
// // // // import { MessageCircle, X } from "lucide-react";
// // // // import axios from "axios";

// // // // const BASE_URL = "http://localhost:8081/api/admin/users"; // update if backend path differs

// // // // const ChatBot = () => {
// // // //   const [isOpen, setIsOpen] = useState(false);
// // // //   const [messages, setMessages] = useState([]);
// // // //   const [userId, setUserId] = useState("");
// // // //   const [input, setInput] = useState("");
// // // //   const [showOptions, setShowOptions] = useState(true);
// // // //   const [showUserOptions, setShowUserOptions] = useState(false);

// // // //   // toggle chat
// // // //   const handleBotClick = () => {
// // // //     setIsOpen(!isOpen);
// // // //     if (!isOpen) {
// // // //       setMessages([{ sender: "bot", text: "Hi 👋 How can I help you?" }]);
// // // //       setShowOptions(true);
// // // //       setShowUserOptions(false);
// // // //       setUserId("");
// // // //       setInput("");
// // // //     }
// // // //   };

// // // //   // main options
// // // //   const handleOption = (option) => {
// // // //     if (option === "About PG") {
// // // //       setMessages((prev) => [
// // // //         ...prev,
// // // //         { sender: "bot", text: "This is PG Management System 🏠" },
// // // //       ]);
// // // //     } else if (option === "Enter User ID") {
// // // //       setMessages((prev) => [
// // // //         ...prev,
// // // //         { sender: "bot", text: "Please enter your User ID 🔑" },
// // // //       ]);
// // // //       setShowOptions(false);
// // // //     }
// // // //   };

// // // //   // handle text input
// // // //   const handleUserInput = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!input.trim()) return;

// // // //     setMessages((prev) => [...prev, { sender: "user", text: input }]);

// // // //     if (!userId) {
// // // //       // first step → treat input as User ID
// // // //       try {
// // // //         const res = await axios.get(`${BASE_URL}/${input}`);
// // // //         const data = res.data;

// // // //         setUserId(input);

// // // //         setMessages((prev) => [
// // // //           ...prev,
// // // //           { sender: "bot", text: `Welcome ${data.userName} 🎉` },
// // // //           { sender: "bot", text: "Choose an option below:" },
// // // //         ]);
// // // //         setShowUserOptions(true);
// // // //       } catch (error) {
// // // //         console.error("Error fetching user:", error);
// // // //         if (error.response) {
// // // //           console.error("Status:", error.response.status, "Data:", error.response.data);
// // // //         }
// // // //         setMessages((prev) => [
// // // //           ...prev,
// // // //           {
// // // //             sender: "bot",
// // // //             text:
// // // //               error.response?.status === 404
// // // //                 ? "⚠️ User ID not found, please try again."
// // // //                 : "❌ Failed to fetch user. Try again later.",
// // // //           },
// // // //         ]);
// // // //       }
// // // //     }

// // // //     setInput("");
// // // //   };

// // // //   // handle Rent / E-bill / Total
// // // //   const handleUserOption = async (action) => {
// // // //     if (!userId) return;

// // // //     try {
// // // //       const res = await axios.get(`${BASE_URL}/${userId}`);
// // // //       const data = res.data;

// // // //       if (action === "rent") {
// // // //         setMessages((prev) => [
// // // //           ...prev,
// // // //           { sender: "bot", text: `💰 Monthly Rent: ₹${data.userMonthlyRent}` },
// // // //         ]);
// // // //       } else if (action === "ebill") {
// // // //         setMessages((prev) => [
// // // //           ...prev,
// // // //           { sender: "bot", text: `⚡ Electricity Bill: ₹${data.userEbill}` },
// // // //         ]);
// // // //       } else if (action === "total") {
// // // //         const total = (data.userMonthlyRent || 0) + (data.userEbill || 0);
// // // //         setMessages((prev) => [
// // // //           ...prev,
// // // //           { sender: "bot", text: `📊 Total Amount: ₹${total}` },
// // // //         ]);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching details:", error);
// // // //       if (error.response) {
// // // //         console.error("Status:", error.response.status, "Data:", error.response.data);
// // // //       }
// // // //       setMessages((prev) => [
// // // //         ...prev,
// // // //         {
// // // //           sender: "bot",
// // // //           text:
// // // //             error.response?.status === 404
// // // //               ? "⚠️ User not found. Please re-enter User ID."
// // // //               : "❌ Failed to fetch details. Try again later.",
// // // //         },
// // // //       ]);
// // // //       setUserId("");
// // // //       setShowUserOptions(false);
// // // //       setShowOptions(true);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       {/* Floating Button */}
// // // //       <button
// // // //         onClick={handleBotClick}
// // // //         className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110"
// // // //       >
// // // //         {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
// // // //       </button>

// // // //       {/* Chat Window */}
// // // //       {isOpen && (
// // // //         <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-2xl p-4 flex flex-col animate-slide-up">
// // // //           <div className="h-64 overflow-y-auto border-b pb-2 mb-2">
// // // //             {messages.map((msg, idx) => (
// // // //               <div
// // // //                 key={idx}
// // // //                 className={`my-1 p-2 rounded-lg max-w-[75%] ${
// // // //                   msg.sender === "bot"
// // // //                     ? "bg-gray-200 text-left"
// // // //                     : "bg-blue-500 text-white self-end text-right"
// // // //                 }`}
// // // //               >
// // // //                 {msg.text}
// // // //               </div>
// // // //             ))}
// // // //           </div>

// // // //           {/* Options */}
// // // //           {showOptions && (
// // // //             <div className="flex gap-2 mb-2">
// // // //               <button
// // // //                 onClick={() => handleOption("About PG")}
// // // //                 className="bg-gray-300 px-3 py-1 rounded-lg"
// // // //               >
// // // //                 About PG
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => handleOption("Enter User ID")}
// // // //                 className="bg-gray-300 px-3 py-1 rounded-lg"
// // // //               >
// // // //                 Enter User ID
// // // //               </button>
// // // //             </div>
// // // //           )}

// // // //           {showUserOptions && (
// // // //             <div className="flex gap-2 mb-2">
// // // //               <button
// // // //                 onClick={() => handleUserOption("rent")}
// // // //                 className="bg-green-300 px-3 py-1 rounded-lg"
// // // //               >
// // // //                 Rent
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => handleUserOption("ebill")}
// // // //                 className="bg-yellow-300 px-3 py-1 rounded-lg"
// // // //               >
// // // //                 E-Bill
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => handleUserOption("total")}
// // // //                 className="bg-red-300 px-3 py-1 rounded-lg"
// // // //               >
// // // //                 Total
// // // //               </button>
// // // //             </div>
// // // //           )}

// // // //           {/* Input Box */}
// // // //           <form onSubmit={handleUserInput} className="flex">
// // // //             <input
// // // //               type="text"
// // // //               value={input}
// // // //               onChange={(e) => setInput(e.target.value)}
// // // //               className="flex-grow border px-2 py-1 rounded-l-lg"
// // // //               placeholder="Type message..."
// // // //             />
// // // //             <button
// // // //               type="submit"
// // // //               className="bg-blue-600 text-white px-4 rounded-r-lg"
// // // //             >
// // // //               Send
// // // //             </button>
// // // //           </form>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ChatBot;



// // // import React, { useState } from "react";
// // // import { MessageCircle, X } from "lucide-react";
// // // import axios from "axios";

// // // const BASE_URL = "http://localhost:8081/api/admin/users"; // backend API

// // // const ChatBot = () => {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [messages, setMessages] = useState([]);
// // //   const [userId, setUserId] = useState("");
// // //   const [input, setInput] = useState("");
// // //   const [showOptions, setShowOptions] = useState(true);
// // //   const [showUserOptions, setShowUserOptions] = useState(false);

// // //   // toggle chat
// // //   const handleBotClick = () => {
// // //     setIsOpen(!isOpen);
// // //     if (!isOpen) {
// // //       setMessages([{ sender: "bot", text: "Hi 👋 How can I help you?" }]);
// // //       setShowOptions(true);
// // //       setShowUserOptions(false);
// // //       setUserId("");
// // //       setInput("");
// // //     }
// // //   };

// // //   // main options
// // //   const handleOption = (option) => {
// // //     if (option === "About PG") {
// // //       setMessages((prev) => [
// // //         ...prev,
// // //         { sender: "bot", text: "This is PG Management System 🏠" },
// // //       ]);
// // //     } else if (option === "Enter User ID") {
// // //       setMessages((prev) => [
// // //         ...prev,
// // //         { sender: "bot", text: "Please enter your User ID 🔑" },
// // //       ]);
// // //       setShowOptions(false);
// // //     }
// // //   };

// // //   // handle text input
// // //   const handleUserInput = async (e) => {
// // //     e.preventDefault();
// // //     if (!input.trim()) return;

// // //     setMessages((prev) => [...prev, { sender: "user", text: input }]);

// // //     if (!userId) {
// // //       try {
// // //         const res = await axios.get(`${BASE_URL}/${input}`);
// // //         const data = res.data;

// // //         setUserId(input);

// // //         setMessages((prev) => [
// // //           ...prev,
// // //           { sender: "bot", text: `Welcome ${data.userName} 🎉` },
// // //           { sender: "bot", text: "Choose an option below:" },
// // //         ]);
// // //         setShowUserOptions(true);
// // //       } catch (error) {
// // //         setMessages((prev) => [
// // //           ...prev,
// // //           {
// // //             sender: "bot",
// // //             text:
// // //               error.response?.status === 404
// // //                 ? "⚠️ User ID not found, please try again."
// // //                 : "❌ Failed to fetch user. Try again later.",
// // //           },
// // //         ]);
// // //       }
// // //     }

// // //     setInput("");
// // //   };

// // //   // handle Rent / E-bill / Total
// // //   const handleUserOption = async (action) => {
// // //     if (!userId) return;

// // //     try {
// // //       const res = await axios.get(`${BASE_URL}/${userId}`);
// // //       const data = res.data;

// // //       if (action === "rent") {
// // //         setMessages((prev) => [
// // //           ...prev,
// // //           { sender: "bot", text: `💰 Monthly Rent: ₹${data.userMonthlyRent}` },
// // //         ]);
// // //       } else if (action === "ebill") {
// // //         setMessages((prev) => [
// // //           ...prev,
// // //           { sender: "bot", text: `⚡ Electricity Bill: ₹${data.userEbill}` },
// // //         ]);
// // //       } else if (action === "total") {
// // //         const total = (data.userMonthlyRent || 0) + (data.userEbill || 0);
// // //         setMessages((prev) => [
// // //           ...prev,
// // //           { sender: "bot", text: `📊 Total Amount: ₹${total}` },
// // //         ]);
// // //       }
// // //     } catch (error) {
// // //       setMessages((prev) => [
// // //         ...prev,
// // //         {
// // //           sender: "bot",
// // //           text:
// // //             error.response?.status === 404
// // //               ? "⚠️ User not found. Please re-enter User ID."
// // //               : "❌ Failed to fetch details. Try again later.",
// // //         },
// // //       ]);
// // //       setUserId("");
// // //       setShowUserOptions(false);
// // //       setShowOptions(true);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       {/* Floating Button */}
// // //       <button
// // //         onClick={handleBotClick}
// // //         className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl transition-transform duration-300 hover:scale-110 z-50"
// // //       >
// // //         {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
// // //       </button>

// // //       {/* Chat Window */}
// // //       {isOpen && (
// // //         <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-2xl p-4 flex flex-col animate-slide-up z-50 border border-gray-200">
// // //           <div className="h-64 overflow-y-auto border-b pb-2 mb-2 scrollbar-thin scrollbar-thumb-gray-300">
// // //             {messages.map((msg, idx) => (
// // //               <div
// // //                 key={idx}
// // //                 className={`my-1 p-2 rounded-lg max-w-[75%] text-sm shadow-md transition-all duration-300 ${
// // //                   msg.sender === "bot"
// // //                     ? "bg-gray-100 text-left animate-fade-in"
// // //                     : "bg-blue-500 text-white self-end text-right animate-fade-in"
// // //                 }`}
// // //               >
// // //                 {msg.text}
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* Options */}
// // //           {showOptions && (
// // //             <div className="flex gap-2 mb-2 animate-fade-in">
// // //               <button
// // //                 onClick={() => handleOption("About PG")}
// // //                 className="bg-gray-200 px-3 py-1 rounded-lg shadow hover:bg-gray-300 transition-all"
// // //               >
// // //                 About PG
// // //               </button>
// // //               <button
// // //                 onClick={() => handleOption("Enter User ID")}
// // //                 className="bg-gray-200 px-3 py-1 rounded-lg shadow hover:bg-gray-300 transition-all"
// // //               >
// // //                 Enter User ID
// // //               </button>
// // //             </div>
// // //           )}

// // //           {showUserOptions && (
// // //             <div className="flex gap-2 mb-2 animate-fade-in">
// // //               <button
// // //                 onClick={() => handleUserOption("rent")}
// // //                 className="bg-green-400 px-3 py-1 rounded-lg shadow hover:bg-green-500 transition-all text-white"
// // //               >
// // //                 Rent
// // //               </button>
// // //               <button
// // //                 onClick={() => handleUserOption("ebill")}
// // //                 className="bg-yellow-400 px-3 py-1 rounded-lg shadow hover:bg-yellow-500 transition-all text-white"
// // //               >
// // //                 E-Bill
// // //               </button>
// // //               <button
// // //                 onClick={() => handleUserOption("total")}
// // //                 className="bg-red-400 px-3 py-1 rounded-lg shadow hover:bg-red-500 transition-all text-white"
// // //               >
// // //                 Total
// // //               </button>
// // //             </div>
// // //           )}

// // //           {/* Input Box */}
// // //           <form onSubmit={handleUserInput} className="flex">
// // //             <input
// // //               type="text"
// // //               value={input}
// // //               onChange={(e) => setInput(e.target.value)}
// // //               className="flex-grow border px-2 py-1 rounded-l-lg text-sm"
// // //               placeholder="Type message..."
// // //             />
// // //             <button
// // //               type="submit"
// // //               className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition-all"
// // //             >
// // //               Send
// // //             </button>
// // //           </form>
// // //         </div>
// // //       )}

// // //       {/* Animations */}
// // //       <style>{`
// // //         @keyframes slide-up {
// // //           from { transform: translateY(20px); opacity: 0; }
// // //           to { transform: translateY(0); opacity: 1; }
// // //         }
// // //         .animate-slide-up {
// // //           animation: slide-up 0.3s ease-out;
// // //         }
// // //         @keyframes fade-in {
// // //           from { opacity: 0; transform: scale(0.95); }
// // //           to { opacity: 1; transform: scale(1); }
// // //         }
// // //         .animate-fade-in {
// // //           animation: fade-in 0.2s ease-out;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default ChatBot;


// // import React, { useState } from "react";
// // import { MessageCircle, X } from "lucide-react";
// // import axios from "axios";

// // const BASE_URL = "http://localhost:8081/api/admin/users";

// // const ChatBot = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [messages, setMessages] = useState([]);
// //   const [userId, setUserId] = useState("");
// //   const [input, setInput] = useState("");
// //   const [showOptions, setShowOptions] = useState(true);
// //   const [showUserOptions, setShowUserOptions] = useState(false);

// //   const toggleChat = () => {
// //     setIsOpen(!isOpen);
// //     if (!isOpen) {
// //       setMessages([{ sender: "bot", text: "Hi 👋 How can I help you?" }]);
// //       setShowOptions(true);
// //       setShowUserOptions(false);
// //       setUserId("");
// //       setInput("");
// //     }
// //   };

// //   const handleOption = (option) => {
// //     if (option === "About PG") {
// //       setMessages((prev) => [
// //         ...prev,
// //         { sender: "bot", text: "This is PG Management System 🏠" },
// //       ]);
// //     } else if (option === "Enter User ID") {
// //       setMessages((prev) => [
// //         ...prev,
// //         { sender: "bot", text: "Please enter your User ID 🔑" },
// //       ]);
// //       setShowOptions(false);
// //     }
// //   };

// //   const handleUserInput = async (e) => {
// //     e.preventDefault();
// //     if (!input.trim()) return;

// //     setMessages((prev) => [...prev, { sender: "user", text: input }]);

// //     if (!userId) {
// //       try {
// //         const res = await axios.get(`${BASE_URL}/${input}`);
// //         const data = res.data;
// //         setUserId(input);
// //         setMessages((prev) => [
// //           ...prev,
// //           { sender: "bot", text: `Welcome ${data.userName} 🎉` },
// //           { sender: "bot", text: "Choose an option below:" },
// //         ]);
// //         setShowUserOptions(true);
// //       } catch (error) {
// //         console.error(error);
// //         setMessages((prev) => [
// //           ...prev,
// //           {
// //             sender: "bot",
// //             text:
// //               error.response?.status === 404
// //                 ? "⚠️ User ID not found, please try again."
// //                 : "❌ Failed to fetch user. Try again later.",
// //           },
// //         ]);
// //       }
// //     }
// //     setInput("");
// //   };

// //   const handleUserOption = async (action) => {
// //     if (!userId) return;

// //     try {
// //       const res = await axios.get(`${BASE_URL}/${userId}`);
// //       const data = res.data;

// //       if (action === "rent") {
// //         setMessages((prev) => [
// //           ...prev,
// //           { sender: "bot", text: `💰 Monthly Rent: ₹${data.userMonthlyRent}` },
// //         ]);
// //       } else if (action === "ebill") {
// //         setMessages((prev) => [
// //           ...prev,
// //           { sender: "bot", text: `⚡ Electricity Bill: ₹${data.userEbill}` },
// //         ]);
// //       } else if (action === "total") {
// //         const total = (data.userMonthlyRent || 0) + (data.userEbill || 0);
// //         setMessages((prev) => [
// //           ...prev,
// //           { sender: "bot", text: `📊 Total Amount: ₹${total}` },
// //         ]);
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       setMessages((prev) => [
// //         ...prev,
// //         {
// //           sender: "bot",
// //           text:
// //             error.response?.status === 404
// //               ? "⚠️ User not found. Please re-enter User ID."
// //               : "❌ Failed to fetch details. Try again later.",
// //         },
// //       ]);
// //       setUserId("");
// //       setShowUserOptions(false);
// //       setShowOptions(true);
// //     }
// //   };

// //   return (
// //     <div>
// //       {/* Floating Chat Icon */}
// //       <button
// //         onClick={toggleChat}
// //         style={{
// //           position: "fixed",
// //           bottom: "20px",
// //           right: "20px",
// //           backgroundColor: "#2575fc",
// //           color: "white",
// //           border: "none",
// //           borderRadius: "50%",
// //           width: "60px",
// //           height: "60px",
// //           cursor: "pointer",
// //           boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           transition: "transform 0.3s",
// //           zIndex: 1000,
// //         }}
// //       >
// //         {isOpen ? <X size={30} /> : <MessageCircle size={30} />}
// //       </button>

// //       {/* Chat Window */}
// //       {isOpen && (
// //         <div
// //           style={{
// //             position: "fixed",
// //             bottom: "90px",
// //             right: "20px",
// //             width: "320px",
// //             maxHeight: "400px",
// //             backgroundColor: "white",
// //             borderRadius: "20px",
// //             boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
// //             display: "flex",
// //             flexDirection: "column",
// //             overflow: "hidden",
// //             animation: "slideUp 0.3s ease-out",
// //             zIndex: 999,
// //           }}
// //         >
// //           {/* Chat Messages */}
// //           <div
// //             style={{
// //               flex: 1,
// //               padding: "10px",
// //               overflowY: "auto",
// //               borderBottom: "1px solid #ddd",
// //             }}
// //           >
// //             {messages.map((msg, idx) => (
// //               <div
// //                 key={idx}
// //                 style={{
// //                   backgroundColor: msg.sender === "bot" ? "#f1f1f1" : "#2575fc",
// //                   color: msg.sender === "bot" ? "#000" : "#fff",
// //                   alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
// //                   marginBottom: "8px",
// //                   padding: "8px 12px",
// //                   borderRadius: "15px",
// //                   maxWidth: "75%",
// //                 }}
// //               >
// //                 {msg.text}
// //               </div>
// //             ))}
// //           </div>

// //           {/* Options */}
// //           {showOptions && (
// //             <div style={{ display: "flex", gap: "5px", padding: "8px" }}>
// //               <button
// //                 onClick={() => handleOption("About PG")}
// //                 style={{
// //                   flex: 1,
// //                   backgroundColor: "#e0e0e0",
// //                   border: "none",
// //                   borderRadius: "10px",
// //                   padding: "6px",
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 About PG
// //               </button>
// //               <button
// //                 onClick={() => handleOption("Enter User ID")}
// //                 style={{
// //                   flex: 1,
// //                   backgroundColor: "#e0e0e0",
// //                   border: "none",
// //                   borderRadius: "10px",
// //                   padding: "6px",
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 Enter User ID
// //               </button>
// //             </div>
// //           )}

// //           {showUserOptions && (
// //             <div style={{ display: "flex", gap: "5px", padding: "8px" }}>
// //               <button
// //                 onClick={() => handleUserOption("rent")}
// //                 style={{
// //                   flex: 1,
// //                   backgroundColor: "#4ade80",
// //                   border: "none",
// //                   borderRadius: "10px",
// //                   padding: "6px",
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 Rent
// //               </button>
// //               <button
// //                 onClick={() => handleUserOption("ebill")}
// //                 style={{
// //                   flex: 1,
// //                   backgroundColor: "#facc15",
// //                   border: "none",
// //                   borderRadius: "10px",
// //                   padding: "6px",
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 E-Bill
// //               </button>
// //               <button
// //                 onClick={() => handleUserOption("total")}
// //                 style={{
// //                   flex: 1,
// //                   backgroundColor: "#f87171",
// //                   border: "none",
// //                   borderRadius: "10px",
// //                   padding: "6px",
// //                   cursor: "pointer",
// //                 }}
// //               >
// //                 Total
// //               </button>
// //             </div>
// //           )}

// //           {/* Input */}
// //           <form
// //             onSubmit={handleUserInput}
// //             style={{ display: "flex", borderTop: "1px solid #ddd" }}
// //           >
// //             <input
// //               type="text"
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               placeholder="Type a message..."
// //               style={{
// //                 flex: 1,
// //                 border: "none",
// //                 padding: "8px",
// //                 outline: "none",
// //               }}
// //             />
// //             <button
// //               type="submit"
// //               style={{
// //                 backgroundColor: "#2575fc",
// //                 color: "#fff",
// //                 border: "none",
// //                 padding: "0 15px",
// //                 cursor: "pointer",
// //               }}
// //             >
// //               Send
// //             </button>
// //           </form>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ChatBot;


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
//     }, 800); // typing delay
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

//     // add user message
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
//       {/* Floating Button */}
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
//             bottom: "90px",
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
//           {/* Chat Messages */}
//           <div
//             style={{
//               flex: 1,
//               padding: "12px",
//               overflowY: "auto",
//               borderBottom: "1px solid #ddd",
//               display: "flex",
//               flexDirection: "column",
//               gap: "6px",
//             }}
//           >
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 style={{
//                   backgroundColor: msg.sender === "bot" ? "#f1f1f1" : "#2575fc",
//                   color: msg.sender === "bot" ? "#000" : "#fff",
//                   alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
//                   padding: "8px 12px",
//                   borderRadius: "15px",
//                   maxWidth: "75%",
//                   wordWrap: "break-word",
//                   whiteSpace: "pre-wrap",
//                   transition: "all 0.3s",
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

//           {/* Options */}
//           {showOptions && (
//             <div style={{ display: "flex", gap: "6px", padding: "8px" }}>
//               <button
//                 onClick={() => handleOption("About PG")}
//                 style={{
//                   flex: 1,
//                   backgroundColor: "#e0e0e0",
//                   border: "none",
//                   borderRadius: "10px",
//                   padding: "6px",
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
//                   borderRadius: "10px",
//                   padding: "6px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Enter User ID
//               </button>
//             </div>
//           )}

//           {showUserOptions && (
//             <div style={{ display: "flex", gap: "6px", padding: "8px" }}>
//               <button
//                 onClick={() => handleUserOption("rent")}
//                 style={{
//                   flex: 1,
//                   backgroundColor: "#4ade80",
//                   border: "none",
//                   borderRadius: "10px",
//                   padding: "6px",
//                   cursor: "pointer",
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
//                   borderRadius: "10px",
//                   padding: "6px",
//                   cursor: "pointer",
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
//                   borderRadius: "10px",
//                   padding: "6px",
//                   cursor: "pointer",
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
//               padding: "6px",
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
//                 borderRadius: "12px",
//                 padding: "8px",
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
//                 padding: "0 16px",
//                 borderRadius: "12px",
//                 cursor: "pointer",
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


import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import axios from "axios";

const BASE_URL = "http://localhost:8081/api/admin/users";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([{ sender: "bot", text: "Hi 👋 How can I help you?" }]);
      setShowOptions(true);
      setShowUserOptions(false);
      setUserId("");
      setInput("");
    }
  };

  const addBotMessage = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text }]);
      setIsTyping(false);
    }, 800);
  };

  const handleOption = (option) => {
    if (option === "About PG") addBotMessage("This is PG Management System 🏠");
    else if (option === "Enter User ID") {
      addBotMessage("Please enter your User ID 🔑");
      setShowOptions(false);
    }
  };

  const handleUserInput = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    if (!userId) {
      try {
        const res = await axios.get(`${BASE_URL}/${input}`);
        const data = res.data;
        setUserId(input);

        addBotMessage(`Welcome ${data.userName} 🎉`);
        setTimeout(() => addBotMessage("Choose an option below:"), 900);
        setShowUserOptions(true);
      } catch (error) {
        console.error(error);
        addBotMessage(
          error.response?.status === 404
            ? "⚠️ User ID not found, please try again."
            : "❌ Failed to fetch user. Try again later."
        );
      }
    }

    setInput("");
  };

  const handleUserOption = async (action) => {
    if (!userId) return;

    // show clicked button as user message
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: action.charAt(0).toUpperCase() + action.slice(1) },
    ]);

    try {
      const res = await axios.get(`${BASE_URL}/${userId}`);
      const data = res.data;

      if (action === "rent") addBotMessage(`💰 Monthly Rent: ₹${data.userMonthlyRent}`);
      else if (action === "ebill") addBotMessage(`⚡ Electricity Bill: ₹${data.userEbill}`);
      else if (action === "total") {
        const total = (data.userMonthlyRent || 0) + (data.userEbill || 0);
        addBotMessage(`📊 Total Amount: ₹${total}`);
      }
    } catch (error) {
      console.error(error);
      addBotMessage(
        error.response?.status === 404
          ? "⚠️ User not found. Please re-enter User ID."
          : "❌ Failed to fetch details. Try again later."
      );
      setUserId("");
      setShowUserOptions(false);
      setShowOptions(true);
    }
  };

  return (
    <div>
      {/* Floating Chat Icon */}
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
          transition: "transform 0.3s",
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
            width: "360px",
            height: "500px",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "slideUp 0.3s ease-out",
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
                  maxWidth: "75%",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  transition: "all 0.3s",
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

          {/* Main Options */}
          {showOptions && (
            <div style={{ display: "flex", gap: "6px", padding: "8px" }}>
              <button
                onClick={() => handleOption("About PG")}
                style={{
                  flex: 1,
                  backgroundColor: "#e0e0e0",
                  border: "none",
                  borderRadius: "12px",
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                About PG
              </button>
              <button
                onClick={() => handleOption("Enter User ID")}
                style={{
                  flex: 1,
                  backgroundColor: "#e0e0e0",
                  border: "none",
                  borderRadius: "12px",
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                Enter User ID
              </button>
            </div>
          )}

          {/* User Options */}
          {showUserOptions && (
            <div style={{ display: "flex", gap: "6px", padding: "8px" }}>
              <button
                onClick={() => handleUserOption("rent")}
                style={{
                  flex: 1,
                  backgroundColor: "#4ade80",
                  border: "none",
                  borderRadius: "12px",
                  padding: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Rent
              </button>
              <button
                onClick={() => handleUserOption("ebill")}
                style={{
                  flex: 1,
                  backgroundColor: "#facc15",
                  border: "none",
                  borderRadius: "12px",
                  padding: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                E-Bill
              </button>
              <button
                onClick={() => handleUserOption("total")}
                style={{
                  flex: 1,
                  backgroundColor: "#f87171",
                  border: "none",
                  borderRadius: "12px",
                  padding: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Total
              </button>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleUserInput}
            style={{
              display: "flex",
              borderTop: "1px solid #ddd",
              padding: "8px",
            }}
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
