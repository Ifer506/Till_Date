// src/App.jsx
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// Components
import LoginPage from "./components/Login";
import Home from "./components/Home";
import Inventory from "./components/Inventory";
import Sales from "./components/Sales";
import Setting from "./components/Setting";
import Salary from "./components/Salary";
import Bill from "./components/Bill";
import Customers from "./components/Customers";
import UserChanges from "./components/UserChanges";
import AllUsers from "./components/AllUsers";
import AddProduct from "./components/AddProduct";
import AllProducts from "./components/AllProducts";


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
          <Route path="userChanges" element={<UserChanges />} />
          <Route path="allprofile" element={<AllUsers />} />
          <Route path="addProducts" element={<AddProduct />} />
          <Route path="allProducts" element={<AllProducts />} />

        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
