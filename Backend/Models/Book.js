import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
author: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
