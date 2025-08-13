// src/admin/ReservationDetails.jsx
import React, { useEffect, useState } from "react";
import { getAdminReservationById } from "../actions/adminActions";
import { useParams, useNavigate } from "react-router-dom";

export default function ReservationDetails(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [resv, setResv] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await getAdminReservationById(id);
        setResv(r.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load");
        navigate("/admin/reservations");
      }
    })();
  }, [id, navigate]);

  if (!resv) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Reservation #{resv.reservation_id}</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><b>User ID:</b> {resv.user_id}</p>
          <p><b>Full Name:</b> {resv.fullname || "-"}</p>
          <p><b>Email:</b> {resv.email || "-"}</p>
          <p><b>Phone:</b> {resv.phone || "-"}</p>
        </div>
        <div>
          <p><b>Date:</b> {resv.date}</p>
          <p><b>Time:</b> {resv.time}</p>
          <p><b>Persons:</b> {resv.num_of_persons}</p>
          <p><b>Created:</b> {resv.created_at}</p>
        </div>
      </div>

      <h3 className="mt-4 font-semibold">Message</h3>
      <p>{resv.message}</p>

      <h3 className="mt-4 font-semibold">Orders</h3>
      {resv.orders && resv.orders.length > 0 ? (
        resv.orders.map(o => (
          <div key={o.order_id || `${o.food_id}-${o.quantity}`} className="flex items-center gap-4 border-t py-2">
            {o.img && <img src={o.img} alt={o.food_name} className="h-12 w-12 object-cover rounded" />}
            <div>
              <div className="font-semibold">{o.food_name}</div>
              <div>Price: {o.price} × Qty: {o.quantity ?? 1}</div>
            </div>
          </div>
        ))
      ) : <p>No orders</p> }

      <button onClick={() => navigate(-1)} className="mt-4 px-3 py-1 border rounded">Back</button>
    </div>
  );
}
