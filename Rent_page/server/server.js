import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import equipmentRoutes from "./routes/equipment.js";
import userRoutes from "./routes/user.js";
import reservationRoutes from "./routes/reservation.js";
dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  next();
});

//routes
app.use("/api/equipment", equipmentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/reservations", reservationRoutes);

//db connect
mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to MongoDB with port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
