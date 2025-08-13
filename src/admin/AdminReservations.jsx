// src/admin/AdminReservations.jsx
import React, { useEffect, useState } from "react";
import { getAdminReservations } from "../actions/adminActions";
import { Link } from "react-router-dom";

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getAdminReservations();
      setReservations(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reservations</h2>
      <div className="overflow-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">User ID</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Persons</th>
              <th className="p-2 text-left">Created</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No reservations
                </td>
              </tr>
            )}
            {reservations.map((r) => (
              <tr key={r.reservation_id} className="border-t">
                <td className="p-2">{r.reservation_id}</td>
                <td className="p-2">{r.user_id}</td>
                <td className="p-2">{r.date}</td>
                <td className="p-2">{r.time}</td>
                <td className="p-2">{r.num_of_persons}</td>
                <td className="p-2">{r.created_at}</td>
                <td className="p-2 flex gap-2">
                  <Link
                    to={`/admin/reservations/${r.reservation_id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/reservations/${r.reservation_id}/invoice`}
                    className="text-green-600 hover:underline"
                  >
                    Invoice
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
