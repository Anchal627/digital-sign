import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
