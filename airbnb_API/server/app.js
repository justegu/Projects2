import express from "express";
import mongoose from "mongoose";
import apiRoutes from "./routes/apiRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api", apiRoutes);

// database connection
mongoose
  .connect(process.env.URI)
  .then(() => app.listen(process.env.PORT))
  .catch((err) => console.log(err));
