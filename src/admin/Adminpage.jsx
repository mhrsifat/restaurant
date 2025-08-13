// src/admin/Adminpage.jsx
import React, { useEffect, useState } from "react";
import { getAdminMenu, getAdminReservations, getTotalUsers } from "../actions/adminActions";
import { Link } from "react-router-dom";

export default function Adminpage() {
  const [menuCount, setMenuCount] = useState(null);
  const [resCount, setResCount] = useState(null);
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const m = await getAdminMenu();
        setMenuCount(Array.isArray(m.data) ? m.data.length : 0);
      } catch (e) {
        setMenuCount(0);
      }
      try {
        const r = await getAdminReservations();
        setResCount(Array.isArray(r.data) ? r.data.length : 0);
      } catch (e) {
        setResCount(0);
      }

      try {
        const t = await getTotalUsers();
        setTotalUser(t.data.total_users ? t.data.total_users : 0);
      } catch (e) {
        setTotalUser(0);
      }
    })();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome, Admin</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Menu items</div>
          <div className="text-2xl font-bold">{menuCount ?? "—"}</div>
          <Link to="/admin/menu" className="text-sm text-blue-600 mt-2 inline-block">
            Manage menu
          </Link>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Reservations</div>
          <div className="text-2xl font-bold">{resCount ?? "—"}</div>
          <Link to="/admin/reservations" className="text-sm text-blue-600 mt-2 inline-block">
            Manage reservations
          </Link>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Users</div>
          <div className="text-2xl font-bold">{totalUser ?? "-"}</div>
          {/* <Link to="/admin/users" className="text-sm text-blue-600 mt-2 inline-block">Manage users</Link> */}
        </div>
      </div>
    </div>
  );
}
