// src/App.jsx
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// Components
import Home from "./components/Home";
import LoginPage from "./components/users/Login";
import UserChanges from "./components/users/UserChanges";
import AllUsers from "./components/users/AllUsers";
import Setting from "./components/users/Setting";
import Inventory from "./components/inventory/Inventory";
import AddProduct from "./components/inventory/AddProduct";
import AllProducts from "./components/inventory/AllProducts";
import Sales from "./components/sales/Sales";
import Salary from "./components/salary/Salary";
import Bill from "./components/bill/Bill";
import Customers from "./components/customers/Customers";


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
