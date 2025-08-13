// src/admin/AdminMenuForm.jsx
import React, { useEffect, useState } from "react";
import {
  addAdminMenuItem,
  getAdminMenuById,
  updateAdminMenuItem,
} from "../actions/adminActions";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminMenuForm() {
  const { id } = useParams(); // when editing
  const navigate = useNavigate();
  const [form, setForm] = useState({
    food_id: "",
    food_name: "",
    description: "",
    img: "",
    price: "",
    type: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await getAdminMenuById(id);
          setForm(res.data || {});
        } catch (err) {
          console.error(err);
          alert("Failed to load item");
          navigate("/admin/menu");
        }
      })();
    }
  }, [id, navigate]);

  const change = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.food_name) err.food_name = "Name required";
    if (!form.price || isNaN(form.price)) err.price = "Valid price required";
    if (!form.type) err.type = "Type required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (id) {
        await updateAdminMenuItem(form);
      } else {
        await addAdminMenuItem(form);
      }
      navigate("/admin/menu");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  return (
    <div className="max-w-2xl bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Edit Menu Item" : "Add Menu Item"}
      </h2>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            name="food_name"
            value={form.food_name || ""}
            onChange={change}
            className="w-full border p-2 rounded"
          />
          {errors.food_name && (
            <div className="text-red-600 text-sm">{errors.food_name}</div>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={change}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Image URL</label>
          <input
            name="img"
            value={form.img || ""}
            onChange={change}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Price</label>
          <input
            name="price"
            value={form.price || ""}
            onChange={change}
            className="w-full border p-2 rounded"
          />
          {errors.price && (
            <div className="text-red-600 text-sm">{errors.price}</div>
          )}
        </div>

        {/* <div>
          <label className="block text-sm mb-1">Type</label>
          <input name="type" value={form.type || ""} onChange={change} className="w-full border p-2 rounded" />
          {errors.type && <div className="text-red-600 text-sm">{errors.type}</div>}
        </div> */}
        <div>
          <label className="block text-sm mb-1">Type</label>
          <select
            name="type"
            value={form.type || ""}
            onChange={change}
            className="w-full border p-2 rounded"
          >
            <option value="">Select type</option>
            <option value="Main Dishes">Main Dishes</option>
            <option value="Starters">Starters</option>
            <option value="Desserts">Desserts</option>
            <option value="Drinks">Drinks</option>
          </select>

          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            {id ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/menu")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
