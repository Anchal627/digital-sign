import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/auth.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://digital-sign-1.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json({ limit: "50mb" }));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
