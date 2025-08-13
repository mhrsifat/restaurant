import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Invoice() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost/restaurant_server/admin/reservation/invoice.php?id=${id}`)
  .then(res => {
    setReservation(res.data);
    setLoading(false);
  })
  .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!reservation) return <p>Invoice not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice #{reservation.invoice_number}</h1>
      <p><strong>Name:</strong> {reservation.customer_name}</p>
      <p><strong>Date:</strong> {reservation.date}</p>
      <p><strong>Total:</strong> ${reservation.total}</p>
    </div>
  );
}
