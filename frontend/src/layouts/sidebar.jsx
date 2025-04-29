// components/Sidebar.jsx
import React, { useState } from "react";
import {
  HomeIcon,
  CompassIcon,
  VideoIcon,
  ClockIcon,
  ThumbsUpIcon,
  MenuIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Home", icon: <HomeIcon size={20} />, path: "/home" },
    { name: "Inventory", icon: <CompassIcon size={20} />, path: "/inventory" },
    { name: "Subscriptions", icon: <VideoIcon size={20} />, path: "/subscriptions" },
    { name: "Watch Later", icon: <ClockIcon size={20} />, path: "/watch-later" },
    { name: "Liked Videos", icon: <ThumbsUpIcon size={20} />, path: "/liked" },
  ];

  return (
    <div
      className={` top-0 z-50 h-screen bg-gradient-to-b from-black via-gray-800 to-gray-700 transition-all duration-300 pt-16 
      ${collapsed ? "w-16" : "w-56"} 
      ${isOpen ? "left-0" : "-left-full"} md:left-0`}
    >
      
      {/* Collapse Button */}
      <div className="flex justify-between items-center px-5 py-3 border-b border-gray-100 dark:border-gray-800">
        {!collapsed && <span className="text-xl font-semibold">Menu</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
        >
          <MenuIcon size={20} />
        </button>
      </div>

      <nav className="mt-2">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            onClick={() => setIsOpen(false)} // close sidebar on mobile when a link is clicked
            className="flex items-center px-5 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {item.icon}
            {!collapsed && <span className="ml-4 text-sm">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};


export default Sidebar;
