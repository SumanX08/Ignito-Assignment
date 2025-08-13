import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  books: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      quantity: Number
    }
  ],
  totalAmount: Number,
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
