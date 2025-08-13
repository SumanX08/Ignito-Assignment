import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

import bookRoutes from "./Routes/BookRoutes.js";
import authorRoutes from "./Routes/AuthorRoutes.js";
import orderRoutes from "./Routes/OrderRoutes.js";

dotenv.config()
const app=express()
const PORT=5000

app.use(cors())
app.use(express.json())

app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/orders", orderRoutes);



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB Connection Error:', err));