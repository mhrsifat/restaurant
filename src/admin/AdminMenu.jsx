// src/admin/AdminMenu.jsx
import React, { useEffect, useState } from "react";
import { getAdminMenu, deleteAdminMenuItem } from "../actions/adminActions";
import { Link, useNavigate } from "react-router-dom";

export default function AdminMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const res = await getAdminMenu();
      setMenu(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteAdminMenuItem(id);
      await load();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Menu</h2>
        <button onClick={() => navigate("/admin/menu/add")} className="bg-gray-700 text-white px-3 py-1 rounded">Add Menu Item</button>
      </div>

      <div className="overflow-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.length === 0 && (
              <tr><td colSpan="5" className="p-4 text-center">No items found</td></tr>
            )}
            {menu.map(item => (
              <tr key={item.food_id} className="border-t">
                <td className="p-2">{item.food_id}</td>
                <td className="p-2">{item.food_name}</td>
                <td className="p-2">{item.price}</td>
                <td className="p-2">{item.type}</td>
                <td className="p-2 space-x-2">
                  <Link to={`/admin/menu/${item.food_id}`} className="text-blue-600">View</Link>
                  <Link to={`/admin/menu/edit/${item.food_id}`} className="text-yellow-600">Edit</Link>
                  <button onClick={() => handleDelete(item.food_id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
