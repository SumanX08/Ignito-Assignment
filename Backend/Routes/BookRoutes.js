import express from "express"
import Book from "../Models/Book.js"

const router = express.Router();

router.post("/", async (req, res) => {
    console.log("1")
  try {
        console.log("2")

    const book = await Book.create(req.body);
        console.log("3")

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, genre, q } = req.query;
    const query = {};
    if (genre) query.genre = genre;
    if (q) query.title = { $regex: q, $options: "i" };

    const books = await Book.find(query)
      .populate("author")
      .limit(Number(limit))
      .skip((page - 1) * limit);

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id/stock", async (req, res) => {
  try {
    const { stock } = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, { stock }, { new: true });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router