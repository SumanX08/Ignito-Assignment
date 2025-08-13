import express from "express";
import Author from "../Models/Author.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, nationality } = req.query;
    const query = {};
    if (nationality) query.nationality = nationality;

    const authors = await Author.find(query)
      .limit(Number(limit))
      .skip((page - 1) * limit);

    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ error: "Author not found" });
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!author) return res.status(404).json({ error: "Author not found" });
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ error: "Author not found" });
    res.json({ message: "Author deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
