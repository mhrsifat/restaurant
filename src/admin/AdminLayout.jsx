// src/admin/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar"; // example
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <AdminHeader />
      <div className="admin-main">
        <AdminSidebar />
        <div className="admin-content">
          <Outlet /> {/* Renders child admin pages */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;