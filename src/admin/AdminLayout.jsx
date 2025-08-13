// src/admin/AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Auto-close on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, [location.pathname]);

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded transition-colors text-sm ${
      isActive ? "bg-gray-700 text-white font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const links = [
    { to: "/admin", label: "Dashboard", emoji: "🏠" },
    { to: "/admin/menu", label: "Menu", emoji: "🍽️" },
    { to: "/admin/reservations", label: "Reservations", emoji: "📅" },
    { to: "/admin/users", label: "Users", emoji: "👥" },
    { to: "/admin/settings", label: "Settings", emoji: "⚙️" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 shadow transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        aria-label="Admin sidebar"
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <img src="/logo2.png" alt="Logo" className="h-8 w-8 object-contain" />
            <span className="text-white font-semibold">Admin Panel</span>
          </div>

          <button className="md:hidden p-2 rounded hover:bg-gray-700/30" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <X size={18} className="text-white" />
          </button>
        </div>

        <nav className="px-3 py-4 space-y-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/admin"} className={navClass} onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}>
              <span className="inline-block w-6 text-center">{l.emoji}</span>
              <span>{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t border-gray-700">
          <button
            className="w-full text-left text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded"
            onClick={() => { alert("Logout - implement logic"); }}
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col md:ml-64">
        <header className="h-16 bg-white shadow flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded hover:bg-gray-100" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <Menu size={20} className="text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">admin@example.com</div>
            <div className="h-8 w-8 bg-gray-200 rounded-full" />
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
