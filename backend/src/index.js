import express from "express";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

import { connectDB } from "./lib/db.js";


app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello server"));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});