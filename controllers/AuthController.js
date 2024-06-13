import argon2 from "argon2";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await argon2.hash(password);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Check if the user is an admin
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        "your_secret_key",
        {
          expiresIn: "1h", // Token expires in 1 hour
        }
      );

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  me: async (req, res) => {
    try {
      const user = await User.findOne(req.userId, {
        attributes: { exclude: ["password"] },
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

export default authController;