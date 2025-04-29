// src/layouts/AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const AppLayout = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={toggleSidebar} />
      <div className="flex-1">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="pt-10 pl-0 md:pl-10 p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
