// src/admin/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to close sidebar only on mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Common link styles
  const linkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded transition ${
      isActive
        ? "bg-gray-700 text-white font-semibold"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-800 w-64 transform transition-transform duration-300 ease-in-out z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} className="text-white" />
          </button>
        </div>

        <nav className="mt-4 space-y-2 px-4">
          <NavLink to="/admin" end className={linkClasses} onClick={handleLinkClick}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/users" className={linkClasses} onClick={handleLinkClick}>
            Users
          </NavLink>
          <NavLink to="/admin/settings" className={linkClasses} onClick={handleLinkClick}>
            Settings
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow h-16 flex items-center justify-between px-4">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;