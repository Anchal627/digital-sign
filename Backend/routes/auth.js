import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const router = express.Router();

// Register
router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      console.error("Missing required fields:", { fullName, email, password });
      return res.status(400).json({ error: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
