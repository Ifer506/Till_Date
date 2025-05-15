// src/App.jsx
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
//so that messages can pop up to confirm that user has been changes or some other things
// import { Toaster } from "react-hot-toast";
import { Toaster } from 'sonner';
import "./App.css";

// Components
import Bill from "./components/bill/Bill";
import Customers from "./components/customers/Customers";
import Home from "./components/Home";
import AddProduct from "./components/inventory/AddProduct";
import AllProducts from "./components/inventory/AllProducts";
import Inventory from "./components/inventory/Inventory";
import Sales from "./components/sales/Sales";
import SalesDetail from "./components/sales/SalesDetail";
import AllUsers from "./components/users/AllUsers";
import LoginPage from "./components/users/Login";
import Setting from "./components/users/Setting";
import UserChanges from "./components/users/UserChanges";

// Layout
import AppLayout from "./layouts/AppLayout";

// Utils
import CreateSale from "./components/sales/CreateSale";
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
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <Toaster richColors position="top-right" />
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
          <Route path="createSales" element={<CreateSale />} />
          <Route path="salesDetails" element={<SalesDetail />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
