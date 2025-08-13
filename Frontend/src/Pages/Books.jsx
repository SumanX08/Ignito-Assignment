import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [bookdata, setBookData] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
  });
  const [editBookId, setEditBookId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
  });

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async () => {
    try {
      await axios.post("http://localhost:5000/api/books", bookdata);
      setBookData({ title: "", author: "", price: "", genre: "" });
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (book) => {
    setEditBookId(book._id);
    setEditData({
      title: book.title,
      author: book.author,
      price: book.price,
      genre: book.genre || "",
    });
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, editData);
      setEditBookId(null);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-3xl text-center font-bold mb-4">Books</h1>

      <div className="mb-6 bg-gray-100 p-4 rounded shadow flex gap-5 justify-center items-center">
        <input
          type="text"
          placeholder="Title"
          value={bookdata.title}
          onChange={(e) => setBookData({ ...bookdata, title: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Author Name"
          value={bookdata.author}
          onChange={(e) => setBookData({ ...bookdata, author: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Genre"
          value={bookdata.genre}
          onChange={(e) => setBookData({ ...bookdata, genre: e.target.value })}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={bookdata.price}
          onChange={(e) => setBookData({ ...bookdata, price: e.target.value })}
          className="border p-2"
        />
        <button
          onClick={addBook}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  ">
        {books.map((book) => (
          <div
            key={book._id}
            className="border p-4 w-full rounded shadow bg-white"
          >
            {editBookId === book._id ? (
              <>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="border p-1 mb-1 w-full"
                />
                <input
                  type="text"
                  value={editData.author}
                  onChange={(e) =>
                    setEditData({ ...editData, author: e.target.value })
                  }
                  className="border p-1 mb-1 w-full"
                />
                <input
                  type="text"
                  value={editData.genre}
                  onChange={(e) =>
                    setEditData({ ...editData, genre: e.target.value })
                  }
                  className="border p-1 mb-1 w-full"
                />
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({ ...editData, price: e.target.value })
                  }
                  className="border p-1 mb-1 w-full"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => saveEdit(book._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditBookId(null)}
                    className="bg-gray-400 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre || "N/A"}</p>
                <p>Price: ₹{book.price}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => startEdit(book)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
