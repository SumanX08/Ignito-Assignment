import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nationality: String,
  dateOfBirth: Date
}, { timestamps: true });

export default mongoose.model("Author", authorSchema);
