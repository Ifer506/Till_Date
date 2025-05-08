// components/Sidebar.jsx
import {
  BadgeDollarSign,
  Contact2,
  HomeIcon,
  LucidePackageSearch,
  MenuIcon,
  ScrollText,
  Settings,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <HomeIcon size={20} />, path: "/home" },
    {
      name: "Inventory",
      icon: <LucidePackageSearch size={20} />,
      path: "/inventory",
    },
    { name: "Sales", icon: <BadgeDollarSign size={20} />, path: "/sales" },
    { name: "Bill", icon: <ScrollText size={20} />, path: "/bill" },
    { name: "Customers", icon: <Contact2 size={20} />, path: "/customers" },
    { name: "Setting", icon: <Settings size={20} />, path: "/setting" },
  ];

  return (
    <div
      className={` top-0 z-50  min-h-screen bg-gradient-to-b from-black via-gray-800 to-gray-700 transition-all duration-300 pt-16 
      ${collapsed ? "w-16" : "w-56"} 
      ${isOpen ? "left-0" : "-left-full"} md:left-0`}
    >
      {/* Collapse Button */}
      <div className="flex items-center px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
        >
          <MenuIcon size={30} />
        </button>
        {!collapsed && (
          <span className="text-xl font-semibold text-gray-200 px-2.5">
            Menu
          </span>
        )}
      </div>

      <nav className="mt-2 ">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname.startsWith(item.path); // active if path starts with menu path

          return (
            <Link
              key={idx}
              to={item.path}
              onClick={() => setIsOpen(false)} // close sidebar on mobile when a link is clicked
              className={`flex items-center px-5 py-3 mx-1 my-1 rounded-xl transition-all duration-20 group
              ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-0 border-blue-500"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span
                className={`min-w-[20px] h-5 w-5 transition-colors duration-200 ${
                  isActive ? "text-blue-500" : "group-hover:text-blue-400"
                }`}
              >
                {item.icon}
              </span>

              {!collapsed && <span className="ml-4">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
