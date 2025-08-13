import React, { useEffect, useState } from "react";
import axios from "axios";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    nationality: "",
  });
  const [editingId, setEditingId] = useState(null);



  const fetchAuthors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/authors");
      setAuthors(res.data);
    } catch (err) {
      console.error("Error fetching authors:", err);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${"http://localhost:5000/api/authors"}/${editingId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/authors", form);
      }
      setForm({ name: "", bio: "", nationality: "" });
      setEditingId(null);
      fetchAuthors();
    } catch (err) {
      console.error("Error saving author:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/authors/${id}`);
      fetchAuthors();
    } catch (err) {
      console.error("Error deleting author:", err);
    }
  };

  const handleEdit = (author) => {
    setForm({
      name: author.name || "",
      bio: author.bio || "",
      nationality: author.nationality || "",
    });
    setEditingId(author._id);
  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl text-center font-bold mb-4">Authors</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded shadow flex gap-5 justify-center items-center">
        <div className="mb-3">
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Enter author name"
            className="border p-2 rounded w-full"
            required
          />
        </div>



        <div className="mb-3">
          <label className="block font-medium mb-1">Nationality</label>
          <input
            type="text"
            value={form.nationality}
            onChange={(e) => setForm({ ...form, nationality: e.target.value })}
            placeholder="Enter nationality"
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white h-10 px-5   rounded hover:bg-blue-600"
        >
          {editingId ? "Update Author" : "Add Author"}
        </button>
      </form>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {authors.map((author) => (
          <div key={author._id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-semibold">{author.name}</h2>
            <p className="text-gray-700">{author.bio}</p>
            {author.nationality && (
              <p className="text-gray-500 text-sm">
                Nationality: {author.nationality}
              </p>
            )}

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(author)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(author._id)}
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

export default Authors;
