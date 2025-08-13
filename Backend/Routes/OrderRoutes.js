import express from "express";
import Order from "../Models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { customerName, status, books } = req.body;

    // Convert book names to IDs
    const booksWithIds = await Promise.all(
      books.map(async (b) => {
        const bookDoc = await Book.findOne({ title: b.book });
        if (!bookDoc) throw new Error(`Book not found: ${b.book}`);
        return { book: bookDoc._id, quantity: b.quantity || 1 };
      })
    );

    const order = await Order.create({
      customerName,
      status,
      books: booksWithIds,
    });

    const populatedOrder = await Order.findById(order._id).populate("books.book");

    res.status(201).json(populatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, status } = req.query;
    const query = {};
    if (status) query.status = status;

    const orders = await Order.find(query)
      .populate("books.book")
      .limit(Number(limit))
      .skip((page - 1) * limit);

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("books.book");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
