
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterAdmin from "./components/RegisterAdmin";
import LoginAdmin from "./components/LoginAdmin";
import UserLoginDashboard from "./components/UserLoginDashboard";
import UserForm from "./components/UserForm";
import PaymentInvoice from "./components/PaymentInvoice";
import UpdateElectricityBill from "./components/UpdateElectricityBill";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Admin token
  return token ? children : <Navigate to="/login" replace />;
};

const UserProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  try {
    return user && JSON.parse(user) ? children : <Navigate to="/user-login" replace />;
  } catch  {
    // corrupted user entry in localStorage
    localStorage.removeItem("user");
    return <Navigate to="/user-login" replace />;
  }
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                height: "100vh",
                width: "100vw",
                backgroundImage: `url("/image/bg-image.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                margin: 0,
                padding: 0,
              }}
            >
              <h1 style={{ color: "white", fontSize: "2rem", textShadow: "2px 2px 4px black" }}>
                Welcome
              </h1>
            </div>
          }
        />

        {/* Admin Routes */}
        <Route path="/register" element={<RegisterAdmin />} />
        <Route path="/login" element={<LoginAdmin />} />
        <Route
          path="/user"
          element={
            <AdminProtectedRoute>
              <UserForm />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <AdminProtectedRoute>
              <UserList />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/view-user/:id"
          element={
            <AdminProtectedRoute>
              <UserDetail />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/update-bill/:id"
          element={
            <AdminProtectedRoute>
              <UpdateElectricityBill />
            </AdminProtectedRoute>
          }
        />

        {/* User Routes */}
        <Route path="/user-login" element={<UserLoginDashboard />} />
        <Route
          path="/user-dashboard"
          element={
            <UserProtectedRoute>
              <UserLoginDashboard />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <UserProtectedRoute>
              <PaymentInvoice />
            </UserProtectedRoute>
          }
        />

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
