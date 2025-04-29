// src/App.jsx
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// Components
import LoginPage from "./components/login";
import Home from "./components/home";
import Inventory from "./components/inventory";
import Sales from "./components/sales";
import Setting from "./components/Setting";
import Salary from "./components/Salary";
import Bill from "./components/Bill";
import Customers from "./components/Customers";

// Layout
import AppLayout from "./layouts/AppLayout";

// Utils
import { AuthProvider } from "./utils/authContext";
import { RequireAuth } from "./utils/requireAuth";

function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthProvider>
      <Routes>
        {/* Login Page - no layout */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Routes - with layout */}
        <Route
          path="/"
          element={
            authenticated ? (
              <AppLayout
                isOpen={mobileSidebarOpen}
                toggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              />
            ) : (
              <RequireAuth>
                <AppLayout
                  isOpen={mobileSidebarOpen}
                  toggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                />
              </RequireAuth>
            )
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="sales" element={<Sales />} />
          <Route path="bill" element={<Bill />} />
          <Route path="customers" element={<Customers />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
