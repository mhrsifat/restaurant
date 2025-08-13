// src/admin/MenuDetails.jsx
import React, { useEffect, useState } from "react";
import { getAdminMenuById } from "../actions/adminActions";
import { useParams, useNavigate } from "react-router-dom";

export default function MenuDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAdminMenuById(id);
        setItem(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load");
        navigate("/admin/menu");
      }
    })();
  }, [id, navigate]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl bg-white p-4 rounded shadow">
      {item.img && <img src={item.img} alt={item.food_name} className="h-32 mb-4 object-cover rounded" />}
      <h2 className="text-2xl font-semibold mb-2">{item.food_name}</h2>
      <p><b>Type:</b> {item.type}</p>
      <p><b>Price:</b> {item.price}</p>
      <p className="mt-2"><b>Description:</b> {item.description}</p>
      <button onClick={() => navigate(-1)} className="mt-4 px-3 py-1 border rounded">Back</button>
    </div>
  );
}
