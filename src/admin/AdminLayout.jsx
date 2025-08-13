// src/admin/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icon library (install: npm i lucide-react)

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 transform transition-transform duration-300 ease-in-out z-40 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mt-4 space-y-2 px-4">
          <Link
            to="/admin"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Users
          </Link>
          <Link
            to="/admin/settings"
            className="block px-3 py-2 rounded hover:bg-gray-700"
          >
            Settings
          </Link>
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