import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    status: "",
    books: "",
  });
  const [editingId, setEditingId] = useState(null);

  

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        customerName: form.customerName,
        status: form.status,
        books: parseBooksInput(form.books),
      };
      if (editingId) {
        await axios.put(`${"http://localhost:5000/api/orders"}/${editingId}`, orderData);
      } else {
        await axios.post("http://localhost:5000/api/orders", orderData);
      }
      setForm({ customerName: "", status: "", books: "" });
      setEditingId(null);
      fetchOrders();
    } catch (err) {
      console.error("Error saving order:", err);
    }
  };

  const parseBooksInput = (input) => {
    return input
      .split(",")
      .map((pair) => {
        const [id, qty] = pair.split(":").map((s) => s.trim());
        return { book: id, quantity: Number(qty) || 1 };
      })
      .filter((b) => b.book);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${"http://localhost:5000/api/orders"}/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const handleEdit = (order) => {
    setForm({
      customerName: order.customerName || "",
      status: order.status || "",
      books:
        order.books
          ?.map((b) => `${b.book?._id || b.book}:${b.quantity}`)
          .join(", ") || "",
    });
    setEditingId(order._id);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Orders</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex items-center justify-center gap-5 bg-gray-100 p-4 rounded shadow">
        <div className="mb-3">
          <label className="block font-medium mb-1">Customer Name</label>
          <input
            type="text"
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            placeholder="Enter customer name"
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">Status</label>
          <input
            type="text"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            placeholder="Enter status "
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">Books</label>
          <input
            type="text"
            value={form.books}
            onChange={(e) => setForm({ ...form, books: e.target.value })}
            placeholder="Book Name"
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update Order" : "Add Order"}
        </button>
      </form>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-semibold">Customer: {order.customerName}</h2>
            <p className="text-gray-600">Status: {order.status}</p>
            <ul className="mt-2 text-sm text-gray-700">
              {order.books?.map((b, idx) => (
                <li key={idx}>
                  {b.book?.title || b.book} — Qty: {b.quantity}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(order)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(order._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
